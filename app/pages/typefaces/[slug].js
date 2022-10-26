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
// import TypeTesters from 'fontdue-js/TypeTesters'

// Lib
import { getStaticQuery, fetchGraphql } from '../../lib/graphql'

export default function TypefaceDetail({ project, font }) {
  // console.log(project, font)

  return (
    <div className='typeface-project push-nav def-x mt-8 lg:mt-16'>
      <Head>
        <title>Furniture | {project.title}</title>
        <meta name="description" content="Furniture" />
      </Head>

      <link rel="stylesheet" href={font.cssUrl} />

      <div className="flex flex-wrap lg:flex-nowrap">
        <h1 className='text-md w-full lg:w-1/4'>{project.title}</h1>

        {project.fontDueSlug && (
          <div className="buy-options w-full lg:w-3/4 mt-8 lg:mt-0">
            <BuyButton 
              collectionSlug={project.fontDueSlug} 
              label="Buy"
            />

            <Link href="/download-trial-fonts">
              <a className={`${styles.download} text-md ml-8 lg:ml-16`}>Download trial fonts</a>
            </Link>
          </div>
        )}
      </div>

      {project.pagecontent && project.pagecontent.length > 0 && (
        <div className="block-items mt-24 lg:mt-32 flex justify-end">
          <div className="w-full lg:w-3/4">
            {project.pagecontent.map((block, index) => {
              switch (block.type) {
                case 'image':
                  return <TypeImage key={index} block={block} />
                case 'textSection':
                  return <TextSection key={index} block={block} font={font} />
                case 'typeTester':
                  return <TypeTester key={index} block={block} font={font} />
                case 'characterCarousel':
                  return <CharacterCarousel key={index} block={block} font={font} />
                case 'characterGrid':
                  return <CharacterGrid key={index} font={font} />
              }
            })}
          </div>
        </div>
      )}
    </div>
  )
}

TypefaceDetail.getLayout = function getLayout(page) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export async function getStaticPaths() {
  const pagesData = await fetch(process.env.API_HOST, {
    method: "POST",
    headers: {
      Authorization: `Basic ${process.env.AUTH}`,
    },
    body: JSON.stringify({
      query: "page('TypefaceProjects').children",
      select: {
        slug: true
      },
    }),
  });

  const jsonData = await pagesData.json();
  const { result } = jsonData

  const paths = result.map((page) => {
    return {
      params: {
        slug: page.slug
      },
    };
  });

  return {
      paths: paths,
      fallback: false,
  };
}

export async function getStaticProps(context) {
  const { slug = '' } = context.params || {}

  // Get data from Kirby CMS
  const projectData = await fetch(process.env.API_HOST, {
      method: "POST",
      headers: {
        Authorization: `Basic ${process.env.AUTH}`,
      },
      body: JSON.stringify({
        query: `page('TypefaceProjects').children.find('${slug}')`,
        select: {
          title: true,
          fontDueSlug: true,
          pagecontent: {
            query: "page.pageContent.toBlocks",
            select: {
              type: true,
              caption: true,
              text: "block.text.markdown",
              placeholder: true,
              showWeights: true,
              alignment: true,
              columns: true,
              fontSize: true,
              description: "block.description.markdown",
              backgroundColor: true,
              image: {
                query: "block.image.toFile",
                select: {
                  url: true,
                  width: true,
                  height: true,
                  alt: true,
                  type: true
                }
              },
              slides: {
                query: "block.slides.toStructure",
                select: {
                  character: true,
                  description: "structureItem.description.markdown",
                  weight: true
                }
              }
            }
          }
        }
      }),
  })

  const jsonData = await projectData.json()
  const { result } = jsonData

  
  // Get data from FontDue
  const fontdueQuery = await getStaticQuery('Font.graphql')
  const data = await fetchGraphql(fontdueQuery, {
    slug: result.fontDueSlug
  })

  return {
    props: {
      project: result,
      font: data.viewer.slug.fontCollection
    },
  }
}