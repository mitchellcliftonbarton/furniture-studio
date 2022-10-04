import Head from 'next/head'

// Components
import DefaultLayout from '../components/layouts/DefaultLayout'

export default function NotFound() {
  return (
    <div className='push-nav def-x'>
      <Head>
        <title>Furniture | 404!</title>
        <meta name="description" content="Furniture" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className='text-base'>404</h1>
    </div>
  )
}

NotFound.getLayout = function getLayout(page) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}
