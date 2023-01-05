import Head from 'next/head'

// Components
import DefaultLayout from '../components/layouts/DefaultLayout'
import TestFontsForm from 'fontdue-js/TestFontsForm'

export default function DownloadTrialFonts({ data }) {
  return (
    <div className='typeface-project push-nav def-x mt-16'>
      <Head>
        <title>Furniture | Download Trial Fonts</title>
        <meta name="description" content="Furniture" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div>
        <h1 className='text-base mb-16 lg:mb-20'>{data.title}</h1>
        <div className="w-full lg:w-1/2">
          <TestFontsForm downloadLabel='Download trial fonts' />
        </div>
      </div>
    </div>
  )
}

DownloadTrialFonts.getLayout = function getLayout(page) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

// For some reason, I have to include this for thepage to work. Has something to do with get initial props in app.js i think
export async function getStaticProps() {
  const data = {
    title: 'Download trial fonts'
  }

  return {
    props: {data: data},
  }
}