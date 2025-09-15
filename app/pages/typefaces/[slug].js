import Head from 'next/head'

// Styles
import styles from '../../styles/Blocks.module.scss'

// Components
import DefaultLayout from '../../components/layouts/DefaultLayout'
import BuyButton from 'fontdue-js/BuyButton'
import Link from 'next/link'
import TypeImage from '../../components/TypeImage'
import TextSection from '../../components/TextSection'
import TypeTester from '../../components/TypeTester'
import CharacterGrid from '../../components/CharacterGrid'
import CharacterCarousel from '../../components/CharacterCarousel'
import CatalogFooter from '../../components/CatalogFooter'

// Lib
import { getStaticQuery, fetchGraphql } from '../../lib/graphql'

export default function TypefaceDetail({ catalogData, allFonts, project, font }) {
  // console.log(project, font)
  const pageTitle = `Furniture | ${project.title}`

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="Furniture"
        />
        <link
          rel="icon"
          href="/favicon.png"
        />
      </Head>

      <link
        rel="stylesheet"
        href={font.cssUrl}
      />

      <div>
        <div className={`${styles['page-title']} page-title text-base relative px-def-half pt-def-half`}>
          <div className="inner bg-grey-1 h-full w-full flex items-center px-def-half">
            <Link href="/">
              <a>
                <h1>Furniture</h1>
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className={`${styles['categories-container']} categories-container relative px-def-half pt-def-half`}>
        <div className="inner bg-grey-1 h-full w-full flex items-center px-def-half">
          <h1 className="text-base w-full lg:w-1/4">{project.title}</h1>

          {project.fontDueSlug && (
            <div className="buy-options w-full lg:w-3/4 mt-8 lg:mt-0 flex items-center">
              <BuyButton
                collectionSlug={project.fontDueSlug}
                label="Buy"
              />

              <Link href="/download-trial-fonts">
                <a className={`${styles.download} whitespace-nowrap text-base ml-8 lg:ml-16`}>Download trial fonts</a>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="typeface-project def-x mt-8 lg:mt-16">
        <div className="pt-40 flex lg:hidden flex-wrap lg:flex-nowrap items-start lg:items-center">
          <h1 className="text-base w-full lg:w-1/4">{project.title}</h1>

          {project.fontDueSlug && (
            <div className="buy-options w-full lg:w-3/4 mt-8 lg:mt-0 flex items-center">
              <BuyButton
                collectionSlug={project.fontDueSlug}
                label="Buy"
              />

              <Link href="/download-trial-fonts">
                <a className={`${styles.download} text-base ml-8 lg:ml-16`}>Download trial fonts</a>
              </Link>
            </div>
          )}
        </div>

        {project.pagecontent && project.pagecontent.length > 0 && (
          <div className="block-items mt-24 lg:mt-32 mb-40 lg:mb-0 flex justify-end">
            <div className="w-full lg:w-3/4">
              {project.pagecontent.map((block, index) => {
                switch (block.type) {
                  case 'image':
                    return (
                      <TypeImage
                        key={index}
                        block={block}
                      />
                    )
                  case 'textSection':
                    return (
                      <TextSection
                        key={index}
                        block={block}
                        font={font}
                      />
                    )
                  case 'typeTester':
                    return (
                      <TypeTester
                        key={index}
                        block={block}
                        font={font}
                      />
                    )
                  case 'characterCarousel':
                    return (
                      <CharacterCarousel
                        key={index}
                        block={block}
                        font={font}
                      />
                    )
                  case 'characterGrid':
                    return (
                      <CharacterGrid
                        key={index}
                        font={font}
                      />
                    )
                }
              })}
            </div>
          </div>
        )}
      </div>

      <CatalogFooter
        catalogData={catalogData}
        allFonts={allFonts}
      />
    </>
  )
}

TypefaceDetail.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>
}

export async function getStaticPaths() {
  const pagesData = await fetch(process.env.API_HOST, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${process.env.AUTH}`,
    },
    body: JSON.stringify({
      query: "page('TypefaceProjects').children",
      select: {
        slug: true,
      },
    }),
  })

  const jsonData = await pagesData.json()
  const { result } = jsonData

  const paths = result.map((page) => {
    return {
      params: {
        slug: page.slug,
      },
    }
  })

  return {
    paths: paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const { slug = '' } = context.params || {}

  // Get data from Kirby CMS
  const projectData = await fetch(process.env.API_HOST, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${process.env.AUTH}`,
    },
    body: JSON.stringify({
      query: `page('TypefaceProjects').children.find('${slug}')`,
      select: {
        title: true,
        fontDueSlug: true,
        pagecontent: {
          query: 'page.pageContent.toBlocks',
          select: {
            type: true,
            caption: true,
            text: 'block.text.markdown',
            placeholder: true,
            showWeights: true,
            alignment: true,
            columns: true,
            fontSize: true,
            description: 'block.description.markdown',
            backgroundColor: true,
            defaultWeight: true,
            image: {
              query: 'block.image.toFile',
              select: {
                url: true,
                width: true,
                height: true,
                alt: true,
                type: true,
              },
            },
            slides: {
              query: 'block.slides.toStructure',
              select: {
                character: true,
                description: 'structureItem.description.markdown',
                weight: true,
              },
            },
          },
        },
      },
    }),
  })

  const jsonData = await projectData.json()
  const { result } = jsonData

  // Get data from FontDue
  const fontdueQuery = await getStaticQuery('Font.graphql')
  const data = await fetchGraphql(fontdueQuery, {
    slug: result.fontDueSlug,
  })

  return {
    props: {
      project: result,
      font: data?.viewer?.slug?.fontCollection,
    },
  }
}
