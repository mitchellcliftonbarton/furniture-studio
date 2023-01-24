import Head from 'next/head'

// Components
import DefaultLayout from '../../components/layouts/DefaultLayout'
import FullImage from '../../components/FullImage'
import ThreeQuartersImage from '../../components/ThreeQuartersImage'
import HalfImage from '../../components/HalfImage'
import CatalogFooter from '../../components/CatalogFooter'
import Link from "next/link";

// Styles
import styles from '../../styles/Blocks.module.scss'

export default function ProjectDetail({ catalogData, allFonts, project }) {
  const pageTitle = `Furniture | ${project.title}`

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Furniture" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      
      <div className={`${styles['page-title']} page-title text-base relative def-x`}>
        <Link href="/">
          <a>Furniture</a>
        </Link>
      </div>

      <div className={`${styles['categories-container']} categories-container def-x`}>
        <h1 className='text-base'>{project.pretitle ? `${project.pretitle} - ` : ''}{project.title}</h1>
      </div>

      <div className='def-x mt-8 lg:mt-16 mb-40 lg:mb-0'>
        <h1 className='pt-40 text-base lg:hidden'>{project.pretitle ? `${project.pretitle} - ` : ''}{project.title}</h1>

        {project.pagecontent && project.pagecontent.length > 0 && (
          <div className="block-items mt-32">
            {project.pagecontent.map((block, index) => {
              switch (block.type) {
                case 'fullImage':
                  return <FullImage block={block} key={index} />
                case 'threeQuartersImage':
                  return <ThreeQuartersImage block={block} key={index} />
                case 'halfImage':
                  return <HalfImage block={block} key={index} />
              }
            })}
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

ProjectDetail.getLayout = function getLayout(page) {
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
      query: "page('BrandProjects').children",
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

  const projectData = await fetch(process.env.API_HOST, {
      method: "POST",
      headers: {
        Authorization: `Basic ${process.env.AUTH}`,
      },
      body: JSON.stringify({
        query: `page('BrandProjects').children.find('${slug}')`,
        select: {
          title: true,
          pretitle: true,
          pagecontent: {
            query: "page.pageContent.toBlocks",
            select: {
              type: true,
              description: "block.description.markdown",
              caption: "block.caption",
              image: {
                query: "block.image.toFile",
                select: {
                  url: true,
                  width: true,
                  height: true,
                  alt: true,
                  type: true
                }
              }
            }
          }
        }
      }),
  })

  const jsonData = await projectData.json()
  const { result } = jsonData

  return {
    props: {project: result},
  }
}