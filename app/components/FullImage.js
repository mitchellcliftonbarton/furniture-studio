import DefImage from './DefImage'

// Styles
import styles from '../styles/Blocks.module.scss'

const FullImage = ({ block }) => {
  return (
    <div className={`${styles['full-image']} mb-20 lg:mb-32`}>
      <DefImage
        src={block.image.url}
        width={block.image.width}
        height={block.image.height}
        alt={block.image.alt}
        className={styles.image}
      />
      {block.caption && (
        <p className="text-base mt-6">{block.caption}</p>
      )}
    </div>
  )
}

export default FullImage