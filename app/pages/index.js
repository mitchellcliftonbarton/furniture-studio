import Head from 'next/head'

// Components
import DefaultLayout from '../components/layouts/DefaultLayout'
import CatalogFooter from '../components/CatalogFooter'
import CategoryFilter from '../components/CategoryFilter'
import ProjectItem from '../components/ProjectItem'
import Link from "next/link";

// React
import { useRouter } from 'next/router'
import { useMemo } from 'react'

// Styles
import styles from '../styles/Blocks.module.scss'

// Lib
import _ from 'lodash'

export default function Home({ catalogData, allFonts, projects }) {
  const router = useRouter()

  const [filteredProjects] = useMemo(() => {
    let value = projects

    if (_.isEmpty(router.query)) {
      value = projects
    }

    if (router.query.filter === 'brand') {
      value = projects.filter(project => project.template === 'brandproject')
    }

    if (router.query.filter === 'type') {
      value = projects.filter(project => project.template === 'typefaceproject')
    }

    if (router.query.filter === 'none') {
      value = false
    }

    return [
      value
    ]
  }, [router.query])

  return (
    <>
      <Head>
        <title>Furniture | Home</title>
        <meta name="description" content="Furniture" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      
      <div className={`${styles['page-title']} page-title text-base relative def-x`}>
        <Link href="/">
          <a>
            <h1>Furniture</h1>
          </a>
        </Link>
      </div>

      <div className={`${styles['categories-container']} categories-container hidden lg:block def-x`}>
        <CategoryFilter />
      </div>
      
      <div className='def-x'>
        {filteredProjects ? (
          <div className="projects pt-40 lg:pt-60 mb-20">
            {filteredProjects.map((project, index) => (
              <ProjectItem 
                project={project} 
                key={project.slug}
                priority={index < 2 ? true : false}
              />
            ))}
          </div>
        ): (
          <div className="pt-40 mb-60 pb-60">
            <h2 className='text-base'>No projects</h2>  
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

Home.getLayout = function getLayout(page) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export async function getStaticProps() {
  const homeData = await fetch(process.env.API_HOST, {
      method: "POST",
      headers: {
        Authorization: `Basic ${process.env.AUTH}`,
      },
      body: JSON.stringify({
        query: "page('home')",
        select: {
          activeprojects: {
            query: "page.activeprojects.toPages",
            select: {
              title: true,
              slug: true,
              template: true,
              detailPageAvailable: 'page.detailPageAvailable.toBool',
              size: "page.homePageSize",
              images: {
                query: "page.carouselImages.toFiles",
                select: {
                  url: true,
                  width: true,
                  height: true,
                  alt: true,
                  type: true
                }
              },
              shortDescription: "page.shortDescription.markdown"
            }
          }
        },
      }),
  })

  const jsonData = await homeData.json()
  const { result } = jsonData
  
  // only let projects through that have images
  const projectsWithImages = result.activeprojects.filter(project => project.images.length > 0)

  return {
    props: {projects: projectsWithImages},
  }
}