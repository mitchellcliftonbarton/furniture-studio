import '../styles/index.scss'

// Lib
// import { getStaticQuery, fetchGraphql } from '../lib/graphql'

// MyApp
function MyApp({ Component, pageProps, infoData, catalogData, allFonts }) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(<Component {...pageProps} infoData={infoData} catalogData={catalogData} allFonts={allFonts} />)
}

MyApp.getInitialProps = async () => {
  const infoData = await fetch(process.env.API_HOST, {
      method: "POST",
      headers: {
          Authorization: `Basic ${process.env.AUTH}`,
      },
      body: JSON.stringify({
          query: "page('info')",
          select: {
            contactlinks: {
              query: "page.contactLinks.toStructure",
              select: {
                title: true,
                link: true,
                linkText: true,
                showInFooter: true
              }
            }
          },
      }),
  })

  const infoJson = await infoData.json()

  const catalogData = await fetch(process.env.API_HOST, {
      method: "POST",
      headers: {
          Authorization: `Basic ${process.env.AUTH}`,
      },
      body: JSON.stringify({
          query: "site",
          select: {
            catalogFooter: {
              query: "site.catalogFooter.toStructure",
              select: {
                title: true,
                isActive: true,
                fontDueSlug: true,
                inactiveEmoji: true
              }
            }
          },
      }),
  })

  const catalogJson = await catalogData.json()


  // Get data from FontDue
  // const fontdueQuery = await getStaticQuery('AllFonts.graphql')
  // const data = await fetchGraphql(fontdueQuery)
  
  return {
    infoData: infoJson.result,
    catalogData: catalogJson.result
  }
}

export default MyApp
