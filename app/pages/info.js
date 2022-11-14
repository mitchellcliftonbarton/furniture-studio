import Head from 'next/head'

// Components
import DefaultLayout from '../components/layouts/DefaultLayout'
import Link from "next/link";

export default function Info({ content }) {
  // console.log(content)
  return (
    <div className='push-nav def-x'>
      <Head>
        <title>Furniture | Info</title>
        <meta name="description" content="Furniture" />
      </Head>

      <div className="flex flex-wrap lg:flex-nowrap py-40 lg:py-60">
        <div className="w-full lg:w-5/6 text-grey-dark lg:pr-80 pb-20 lg:pb-0 enter-in-1">
          {content.introtext && (
            <div 
              className="text-base rich-text mb-16 lg:mb-40" 
              dangerouslySetInnerHTML={{ __html: content.introtext }}
            ></div>
          )}

          {content.studioinfotems.length > 0 && (
            <div className="border-t grid grid-cols-3 gap-8 lg:gap-24 pt-def pb-16 lg:pb-40">
              {content.studioinfotems.map((item, index) => (
                <div 
                  className="text-base rich-text col-span-3 lg:col-span-1" 
                  dangerouslySetInnerHTML={{ __html: item.text }}
                  key={index}
                ></div>
              ))}
            </div>
          )}

          <div className="border-t grid grid-cols-3 gap-8 lg:gap-24 pt-def pb-16 lg:pb-40">
            <div className="col-span-3 flex items-center justify-start">
              <h2 className="text-base mr-12 lg:mr-20">Licensing Information</h2>

              {content.licensingpdftext && content.licensingpdf.length > 0 && (
                <a href={content.licensingpdf[0].url} download className='def-button text-base' target="_blank" rel="noreferrer">{content.licensingpdftext}</a>
              )}
            </div>

            {content.licensinginfotems.map((item, index) => (
              <div 
                className="text-base rich-text col-span-3 lg:col-span-1" 
                dangerouslySetInnerHTML={{ __html: item.text }}
                key={index}
              ></div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/6 text-grey-dark lg:pr-32">
          {content.contactlinks.length > 0 && (
            <div className="w-full">
              {content.contactlinks.map((item, index) => (
                <div 
                  className="mb-8 enter-in-1" 
                  key={index}
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <p className='text-base'>{item.title}</p>
                  <Link href={item.link}>
                    <a className='text-base fade'>
                      {item.linkText}
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {content.contactText && (
            <div 
              className="text-base rich-text" 
              dangerouslySetInnerHTML={{ __html: content.contactText }}
            ></div>
          )}
        </div>
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
              studioinfotems: {
                query: "page.studioInfoItems.toStructure",
                select: {
                  text: "structureItem.text.markdown"
                }
              },
              licensingpdf: {
                query: "page.licensingPdf.toFiles",
                select: {
                  url: true,
                  type: true
                }
              },  
              licensingpdftext: true,
              licensinginfotems: {
                query: "page.licensingInfoItems.toStructure",
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
              },
              contactText: true
            },
        }),
    })

    const jsonData = await infoData.json()
    const { result } = jsonData

    return {
      props: {content: result},
    }
}