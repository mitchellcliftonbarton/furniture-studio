import Head from 'next/head'

// Components
import DefaultLayout from '../components/layouts/DefaultLayout'
// import Link from 'next/link'
// import CopyPasteLink from '../components/CopyPasteLink'

// Styles
import styles from '../styles/Info.module.scss'

export default function Info({ content }) {
  return (
    <div className="push-nav def-x">
      <Head>
        <title>Furniture | Info</title>
        <meta
          name="description"
          content="Furniture"
        />
        <link
          rel="icon"
          href="/favicon.png"
        />
      </Head>

      <div className="pt-[200px] lg:pb-40 lg:pt-[350px] lg:pb-60">
        {content.modules.map((module, index) => {
          switch (module.type) {
            case 'centeredText':
              return (
                <section
                  className={`${styles.infosection} flex justify-center items-start`}
                  key={index}
                >
                  <div
                    className="text-base rich-text"
                    dangerouslySetInnerHTML={{ __html: module.text }}
                  ></div>
                </section>
              )
            case 'twoColumnText':
              return (
                <section
                  className={`${styles.infosection} grid grid-cols-2 gap-def`}
                  key={index}
                >
                  <div
                    className="col-span-1 text-base rich-text lg:pr-40"
                    dangerouslySetInnerHTML={{ __html: module.column1Text }}
                  ></div>
                  <div
                    className="col-span-1 text-base rich-text lg:pr-40"
                    dangerouslySetInnerHTML={{ __html: module.column2Text }}
                  ></div>
                </section>
              )
            case 'twoColumnList':
              return (
                <section
                  className={`${styles.infosection} grid grid-cols-2 gap-def`}
                  key={index}
                >
                  <div className="col-span-1 text-base">
                    {module.column1ListTitle && <h2 className="text-base">{module.column1ListTitle}</h2>}

                    {module.column1ListItems && (
                      <div
                        className="text-base rich-text text-grey-light-2"
                        dangerouslySetInnerHTML={{ __html: module.column1ListItems }}
                      ></div>
                    )}
                  </div>
                  <div className="col-span-1 text-base">
                    {module.column2ListTitle && <h2 className="text-base">{module.column2ListTitle}</h2>}

                    {module.column2ListItems && (
                      <div
                        className="text-base rich-text text-grey-light-2"
                        dangerouslySetInnerHTML={{ __html: module.column2ListItems }}
                      ></div>
                    )}
                  </div>
                </section>
              )
            default:
              return null
          }
        })}

        {/*
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
            <div className="col-span-3 flex flex-wrap lg:flex-nowrap items-center justify-start mb-4 lg:mb-0">
              <h2 className="text-base lg:mr-20 w-full lg:w-auto mb-8 lg:mb-0">Licensing Information</h2>

              {content.licensingpdftext && content.licensingpdf.length > 0 && (
                <a
                  href={content.licensingpdf[0].url}
                  download
                  className="def-button text-base"
                  target="_blank"
                  rel="noreferrer"
                >
                  {content.licensingpdftext}
                </a>
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
                  <p className="text-base">{item.title}</p>
                  {item.link.includes('mailto') ? (
                    <CopyPasteLink link={item} />
                  ) : (
                    <Link href={item.link}>
                      <a className="text-base fade">{item.linkText}</a>
                    </Link>
                  )}
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
        */}
      </div>
    </div>
  )
}

Info.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>
}

export async function getStaticProps() {
  const infoData = await fetch(process.env.API_HOST, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${process.env.AUTH}`,
    },
    body: JSON.stringify({
      query: "page('info')",
      select: {
        modules: {
          query: 'page.modules.toBlocks',
          select: {
            type: true,
            text: 'block.text.kirbytext',
            column1Text: 'block.column1Text.kirbytext',
            column2Text: 'block.column2Text.kirbytext',
            column1ListTitle: true,
            column1ListItems: 'block.column1ListItems.kirbytext',
            column2ListTitle: true,
            column2ListItems: 'block.column2ListItems.kirbytext',
          },
        },
        introtext: 'page.introText.markdown',
        studioinfotems: {
          query: 'page.studioInfoItems.toStructure',
          select: {
            text: 'structureItem.text.markdown',
          },
        },
        licensingpdf: {
          query: 'page.licensingPdf.toFiles',
          select: {
            url: true,
            type: true,
          },
        },
        licensingpdftext: true,
        licensinginfotems: {
          query: 'page.licensingInfoItems.toStructure',
          select: {
            text: 'structureItem.text.markdown',
          },
        },
        contactlinks: {
          query: 'page.contactLinks.toStructure',
          select: {
            title: true,
            link: true,
            linkText: true,
          },
        },
        contactText: true,
      },
    }),
  })

  const jsonData = await infoData.json()
  const { result } = jsonData

  return {
    props: { content: result },
  }
}
