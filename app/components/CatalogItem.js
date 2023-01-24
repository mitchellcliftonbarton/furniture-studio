// Styles
import styles from '../styles/Blocks.module.scss'

// Components
import Link from 'next/link'

export default function CatalogItem({ item, allFonts }) {
  const isActive = item.isActive === 'true'
  let selectedFont = false
  let fontStyles = false

  if (isActive) {
    selectedFont = allFonts.find(font => font.node.slug.name === item.fontDueSlug).node
  }

  if (selectedFont) {
    fontStyles = selectedFont.fontStyles
  }

  return (
    <div className={`${styles['catalog-item']} ${isActive ? styles.active : null} col-span-3 lg:col-span-1`}>
      <link rel="stylesheet" href={selectedFont.cssUrl} />

      {isActive ? (
        <h2 className='text-base mb-6'>{item.title}</h2>
      ): (
        <h2 className='text-base mb-6'>(Coming Soon)</h2>
      )}
      
      {isActive ? (
        <Link
          href={item.link.template === 'typefaceproject' ? `/typefaces/${item.link.slug}` : `/projects/${item.link.slug}`}
        >
          <a className={`${styles.inner} p-8 block`}>
            {fontStyles.map((style, index) => {
              const family = `${style.cssFamily} ${style.name}`

              return (
                <p
                  key={index}
                  className={styles['text-line']}
                  style={{
                    fontFamily: family
                  }}
                >{selectedFont.name} {style.name}</p>
              )
            })}
          </a>
        </Link>
      ): (
        <div className={`${styles.inner} flex justify-center items-center`}>
          <p className={styles.emoji}>{item.inactiveEmoji}</p>
        </div>
      )}
    </div>
  )
}