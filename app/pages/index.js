import Head from 'next/head'

// Components
import DefaultLayout from '../components/layouts/DefaultLayout'
import CatalogFooter from '../components/CatalogFooter'
import CategoryFilter from '../components/CategoryFilter'
import ProjectItem from '../components/ProjectItem'
import Carousel from '../components/Carousel'
import Link from 'next/link'

// React
import { useRouter } from 'next/router'
import { useMemo } from 'react'

// Styles
import styles from '../styles/Blocks.module.scss'

// Lib
import _ from 'lodash'

export default function Home({
  catalogData,
  allFonts,
  modules,
  heroCarouselImages,
  heroCarouselTitle,
  heroAutoplayDuration,
}) {
  const router = useRouter()

  const [filteredModules] = useMemo(() => {
    let value = modules

    if (_.isEmpty(router.query)) {
      value = modules
    }

    if (router.query.filter === 'brand') {
      value = modules.filter((module) => module?.project?.template === 'brandproject')
    }

    if (router.query.filter === 'type') {
      value = modules.filter((module) => module?.project?.template === 'typefaceproject')
    }

    if (router.query.filter === 'none') {
      value = false
    }

    return [value]
  }, [router.query])

  return (
    <>
      <Head>
        <title>Furniture | Home</title>
        <meta
          name="description"
          content="Furniture"
        />
        <link
          rel="icon"
          href="/favicon.png"
        />
      </Head>

      <div>
        <div className={`${styles['page-title']} page-title text-base relative px-def pt-def-half`}>
          <Link href="/">
            <a>
              <h1>Furniture</h1>
            </a>
          </Link>
        </div>

        {heroCarouselImages.length > 0 && (
          <div className="def-x mt-def">
            <Carousel
              images={heroCarouselImages}
              title={heroCarouselTitle}
              noMargin={true}
              autoplayDuration={heroAutoplayDuration}
              skinny={true}
            />
          </div>
        )}
      </div>

      <div className={`${styles['categories-container']} categories-container hidden lg:block def-x pt-def-half`}>
        <CategoryFilter />
      </div>

      <div className="def-x">
        {filteredModules && filteredModules.length > 0 ? (
          <div className="projects pt-40 lg:pt-60 mb-20">
            {filteredModules.map((module, index) => {
              switch (module.type) {
                case 'featuredProject':
                  return (
                    <ProjectItem
                      project={module.project}
                      key={module.project.slug}
                      priority={index < 2 ? true : false}
                    />
                  )
                case 'carousel':
                  return (
                    <Carousel
                      images={module.carouselImages}
                      title={module.carouselTitle}
                      key={index}
                    />
                  )
              }
            })}
          </div>
        ) : (
          <div className="pt-40 mb-60 pb-60">
            <h2 className="text-base">No projects</h2>
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
  return <DefaultLayout>{page}</DefaultLayout>
}

export async function getStaticProps() {
  const homeData = await fetch(process.env.API_HOST, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${process.env.AUTH}`,
    },
    body: JSON.stringify({
      query: "page('home')",
      select: {
        heroCarouselImages: {
          query: 'page.heroCarouselImages.toFiles',
          select: {
            url: true,
            width: true,
            height: true,
            alt: true,
            type: true,
          },
        },
        heroCarouselTitle: {
          query: 'page.heroCarouselTitle',
        },
        heroAutoplayDuration: {
          query: 'page.heroAutoplayDuration',
        },
        modules: {
          query: 'page.modules.toBlocks',
          select: {
            type: true,
            project: {
              query: 'block.project.toPage',
              select: {
                title: 'page.title',
                slug: 'page.slug',
                template: 'page.template',
                detailPageAvailable: 'page.detailPageAvailable.toBool',
                size: 'page.homePageSize',
                images: {
                  query: 'page.carouselImages.toFiles',
                  select: {
                    url: true,
                    width: true,
                    height: true,
                    alt: true,
                    type: true,
                  },
                },
                shortDescription: 'page.shortDescription.markdown',
              },
            },
            carouselImages: {
              query: 'block.images.toFiles',
              select: {
                url: true,
                width: true,
                height: true,
                alt: true,
                type: true,
              },
            },
            carouselTitle: {
              query: 'block.title',
            },
          },
        },
        activeprojects: {
          query: 'page.activeprojects.toPages',
          select: {
            title: true,
            slug: true,
            template: true,
            detailPageAvailable: 'page.detailPageAvailable.toBool',
            size: 'page.homePageSize',
            images: {
              query: 'page.carouselImages.toFiles',
              select: {
                url: true,
                width: true,
                height: true,
                alt: true,
                type: true,
              },
            },
            shortDescription: 'page.shortDescription.markdown',
          },
        },
      },
    }),
  })

  const jsonData = await homeData.json()
  const { result } = jsonData

  // only let projects through that have images
  // const projectsWithImages = result.activeprojects.filter((project) => project.images.length > 0)

  return {
    props: {
      modules: result.modules,
      heroCarouselImages: result.heroCarouselImages,
      heroCarouselTitle: result.heroCarouselTitle,
      heroAutoplayDuration: result.heroAutoplayDuration,
    },
  }
}
