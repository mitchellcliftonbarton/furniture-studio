// Styles
import styles from '../styles/CategoryFilter.module.scss'

// Components
import Link from 'next/link'
import { Check } from './icons/Icons'

const CategoryFilter = () => {
  return (
    <nav className={`${styles.filters} mb-40`}>
      <ul className="flex h-full items-center">
        <li className="w-1/4">
          <Link href="/">
            <a className='text-base flex items-center'>
              <div className={`${styles.checkbox} mr-4 relative flex items-center justify-center`}>
                <Check/>
              </div>
              <span>Brand identity</span>
            </a>
          </Link>
        </li>
        <li className="w-1/4">
          <Link href="/">
            <a className='text-base flex items-center'>
              <div className={`${styles.checkbox} mr-4 relative flex items-center justify-center`}>
                <Check/>
              </div>
              <span>Type catalog</span>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default CategoryFilter