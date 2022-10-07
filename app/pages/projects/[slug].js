import Head from 'next/head'

// Components
import DefaultLayout from '../../components/layouts/DefaultLayout'
import FullImage from '../../components/FullImage'
import ThreeQuartersImage from '../../components/ThreeQuartersImage'
import HalfImage from '../../components/HalfImage'

export default function ProjectDetail({ project }) {
  // console.log(project)

  return (
    <div className='push-nav def-x mt-16'>
      <Head>
        <title>Furniture | {project.title}</title>
        <meta name="description" content="Furniture" />
      </Head>

      <h1 className='text-md'>{project.pretitle ? `${project.pretitle} - ` : ''}{project.title}</h1>

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