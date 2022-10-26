import Head from 'next/head'

// Components
import DefaultLayout from '../components/layouts/DefaultLayout'
import Link from "next/link";

export default function Info({ content }) {
  return (
    <div className='push-nav def-x'>
      <Head>
        <title>Furniture | Info</title>
        <meta name="description" content="Furniture" />
      </Head>

      <div className="flex flex-wrap lg:flex-nowrap py-40 lg:py-60">
        <div className="w-full lg:w-3/4 text-grey-dark lg:pr-80 pb-20 lg:pb-0 enter-in-1">
          {content.introtext && (
            <div 
              className="text-md rich-text mb-16 lg:mb-24" 
              dangerouslySetInnerHTML={{ __html: content.introtext }}
            ></div>
          )}

          {content.listitems.map((item, index) => (
            <div 
              className="text-md rich-text border-t border-black pt-6 pb-8 lg:pb-12" 
              dangerouslySetInnerHTML={{ __html: item.text }}
              key={index}
            ></div>
          ))}
        </div>

        {content.contactlinks.length > 0 && (
          <div className="w-full lg:w-1/4 text-grey-dark lg:pr-32">
            {content.contactlinks.map((item, index) => (
              <div 
                className="mb-8 enter-in-1" 
                key={index}
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <p className='text-md'>{item.title}</p>
                <Link href={item.link}>
                  <a className='text-md fade'>
                    {item.linkText}
                  </a>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

Info.getLayout = function getLayout(page) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export async function getStaticProps() {
    const infoData = await fetch(process.env.API_HOST, {
        method: "POST",
        headers: {
            Authorization: `Basic ${process.env.AUTH}`,
        },
        body: JSON.stringify({
            query: "page('info')",
            select: {
              introtext: "page.introText.markdown",
              listitems: {
                query: "page.listItems.toStructure",
                select: {
                  text: "structureItem.text.markdown"
                }
              },
              contactlinks: {
                query: "page.contactLinks.toStructure",
                select: {
                  title: true,
                  link: true,
                  linkText: true
                }
              }
            },
        }),
    })

    const jsonData = await infoData.json()
    const { result } = jsonData

    return {
      props: {content: result},
    }
}