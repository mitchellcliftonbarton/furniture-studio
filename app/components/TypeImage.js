import Image from 'next/image'

// Styles
import styles from '../styles/Blocks.module.scss'

// Lib
import classnames from 'classnames'

const TypeImage = ({ block }) => {
  const classes = classnames(
    'mb-60',
    {
      'flex': block.text
    }
  )

  return (
    <div className={`${styles['type-image']} ${classes}`}>
      <div className={block.text ? 'w-full lg:w-3/4 lg:pr-20' : 'w-full'}>
        <Image
          src={block.image.url}
          width={block.image.width}
          height={block.image.height}
          alt={block.image.alt}
          className={styles.image}
        />
        {block.caption && (
          <p className="text-md mt-6">{block.caption}</p>
        )}
      </div>

      {block.text && (
        <div className="text-md w-full lg:w-1/4" dangerouslySetInnerHTML={{__html: block.text}}></div>
      )}
    </div>
  )
}

export default TypeImage