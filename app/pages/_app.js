import '../styles/index.scss'

// Lib
import fetchGraphql from '../lib/fetchGraphql'
import { GoogleAnalytics } from 'nextjs-google-analytics'

// MyApp
function MyApp({ Component, pageProps, infoData, catalogData, allFonts }) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <>
      <GoogleAnalytics trackPageViews />
      <Component
        {...pageProps}
        infoData={infoData}
        catalogData={catalogData}
        allFonts={allFonts}
      />
    </>
  )
}

MyApp.getInitialProps = async () => {
  const infoData = await fetch(process.env.API_HOST, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${process.env.AUTH}`,
    },
    body: JSON.stringify({
      query: "page('info')",
      select: {
        contactlinks: {
          query: 'page.contactLinks.toStructure',
          select: {
            title: true,
            link: true,
            linkText: true,
            showInFooter: true,
          },
        },
      },
    }),
  })

  const infoJson = await infoData.json()

  const catalogData = await fetch(process.env.API_HOST, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${process.env.AUTH}`,
    },
    body: JSON.stringify({
      query: 'site',
      select: {
        catalogFooter: {
          query: 'site.catalogFooter.toStructure',
          select: {
            title: true,
            isActive: true,
            fontDueSlug: true,
            placeholderImage: {
              query: 'structureItem.placeholderImage.toFiles',
              select: {
                url: true,
                width: true,
                height: true,
                alt: true,
                type: true,
              },
            },
            inactiveEmoji: true,
            link: {
              query: 'structureItem.link.toPage',
              select: {
                slug: true,
                template: true,
              },
            },
          },
        },
      },
    }),
  })

  const catalogJson = await catalogData.json()

  // Get data from FontDue
  const data = await fetchGraphql(`
    query {
      viewer {
        fontCollections(first: 50) {
          edges {
            node {
              id
              name
              cssUrl
              slug {
                name
                id
              }
              fontStyles {
                name
                cssFamily
                cssStyle
                cssWeight
              }
            }
          }
        }
      }
    }
  `)

  return {
    infoData: infoJson.result,
    catalogData: catalogJson.result,
    allFonts: data.viewer.fontCollections.edges,
  }
}

export default MyApp
