import Head from 'next/head'

// Components
import DefaultLayout from '../components/layouts/DefaultLayout'
import CategoryFilter from '../components/CategoryFilter'
import ProjectItem from '../components/ProjectItem'

export default function Home({ content }) {
  const { activeprojects } = content

  console.log(activeprojects)

  return (
    <div className='push-nav def-x'>
      <Head>
        <title>Furniture</title>
        <meta name="description" content="Furniture" />
      </Head>

      <CategoryFilter />
      
      <div className="projects mb-20">
        {activeprojects.map(project => (
          <ProjectItem 
            project={project} 
            key={project.slug}
          />
        ))}
      </div>
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
                  alt: true
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

  return {
    props: {content: result},
  }
}