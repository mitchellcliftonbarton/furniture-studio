import Image from 'next/image'

// Styles
import styles from '../styles/Blocks.module.scss'

const HalfImage = ({ block }) => {
  return (
    <div className="mb-20 lg:mb-32 flex flex-wrap lg:flex-nowrap justify-between items-start">
      <div className={`${styles['half-image']} w-full lg:w-1/2`}>
        <Image
          src={block.image.url}
          width={block.image.width}
          height={block.image.height}
          alt={block.image.alt}
          className={styles.image}
        />
      </div>

      {block.description && (
        <div
          className="text-base w-full lg:w-1/4 mt-6 lg:mt-0"
          dangerouslySetInnerHTML={{ __html: block.description }}
        ></div>
      )}
    </div>
  )
}

export default HalfImage