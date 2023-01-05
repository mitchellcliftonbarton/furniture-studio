import DefImage from './DefImage'

// Styles
import styles from '../styles/Blocks.module.scss'

const ThreeQuartersImage = ({ block }) => {
  return (
    <div className="mb-32 lg:mb-80">
      <div className={`${styles['three-quarters-image']} w-full lg:w-3/4`}>
        <DefImage
          src={block.image.url}
          width={block.image.width}
          height={block.image.height}
          alt={block.image.alt}
          className={styles.image}
        />
      </div>

      {block.description && (
        <div
          className="text-base w-full lg:w-1/2 mt-6"
          dangerouslySetInnerHTML={{ __html: block.description }}
        ></div>
      )}
    </div>
  )
}

export default ThreeQuartersImage