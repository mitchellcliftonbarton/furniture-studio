import Head from 'next/head'

// Components
import DefaultLayout from '../components/layouts/DefaultLayout'
import CategoryFilter from '../components/CategoryFilter'
import ProjectItem from '../components/ProjectItem'

// React
import { useRouter } from 'next/router'
import { useMemo } from 'react'

// Lib
import _ from 'lodash'

export default function Home({ projects }) {
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
    <div className='push-nav def-x'>
      <Head>
        <title>Furniture | Home</title>
        <meta name="description" content="Furniture" />
      </Head>

      <div className="hidden lg:block">
        <CategoryFilter />
      </div>
      
      {filteredProjects ? (
        <div className="projects pt-20 lg:pt-0 mb-20">
          {filteredProjects.map(project => (
            <ProjectItem 
              project={project} 
              key={project.slug}
            />
          ))}
        </div>
      ): (
        <div className="mb-20">
          <h2>No projects</h2>  
        </div>
      )}
    </div>
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