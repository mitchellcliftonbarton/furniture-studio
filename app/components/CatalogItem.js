// Styles
import styles from '../styles/Blocks.module.scss'

export default function CatalogItem({ item }) {
  const isActive = item.isActive === 'true'
  return (
    <div className={`${styles['catalog-item']} ${isActive ? styles.active : null} col-span-1`}>
      {isActive ? (
        <h2 className='text-md mb-6'>{item.title}</h2>
      ): (
        <h2 className='text-md mb-6'>(Coming Soon)</h2>
      )}

      <div className={`${styles.inner} ${isActive ? null : 'flex justify-center items-center'}`}>
        {isActive ? (
          <p>Active</p>
        ): (
          <p className={styles.emoji}>{item.inactiveEmoji}</p>
        )}
      </div>
    </div>
  )
}