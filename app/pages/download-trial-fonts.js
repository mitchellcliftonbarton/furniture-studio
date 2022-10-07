import Head from 'next/head'

// Components
import DefaultLayout from '../components/layouts/DefaultLayout'
import TestFontsForm from 'fontdue-js/TestFontsForm'

export default function DownloadTrialFonts() {
  return (
    <div className='typeface-project push-nav def-x mt-16'>
      <Head>
        <title>Furniture | Download Trial Fonts</title>
        <meta name="description" content="Furniture" />
      </Head>

      <div>
        <h1 className='text-md mb-20'>Download trial fonts</h1>
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