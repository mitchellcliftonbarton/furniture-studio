// Styles
import styles from '../styles/MainNav.module.scss'

// Components
// import Link from 'next/link'
import CategoryFilter from './CategoryFilter'

import { useRouter } from 'next/router'

const MobileMenu = ({ currentTheme, setCurrentTheme, themes, mobileMenuOpen, setMobileMenuOpen }) => {
  const router = useRouter()

  return (
    <div className={`${styles['mobile-menu']} ${mobileMenuOpen ? styles.open : null} fixed top-0 left-0 w-full h-full`}>
      <div
        onClick={() => setMobileMenuOpen(false)}
        className={`${styles['menu-closer']} absolute top-0 left-0 w-full h-full`}
      ></div>

      <div className={`${styles.menu} px-def pb-6 pt-40`}>
        {router.route === '/' && <CategoryFilter />}

        <div className="flex items-center">
          {themes.map((theme, index) => (
            <button
              className={`${styles['font-button']} ${currentTheme === index ? styles.active : null} font-button text-base flex justify-center items-center`}
              key={`${theme}-${index}`}
              onClick={() => setCurrentTheme(index)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
