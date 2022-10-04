// Styles
import styles from '../styles/MainNav.module.scss'

// Components
import Link from 'next/link'
import CartButton from 'fontdue-js/CartButton'

const MainNav = ({currentTheme, setCurrentTheme, themes}) => {
  return (
    <header 
      id={styles.nav} 
      className="fixed top-0 left-0 w-full def-x flex justify-between items-center"
    >
      <Link href="/">
        <a className="text-base">Furniture</a>
      </Link>

      <div className="flex items-center">
        <Link href="/info">
          <a className="text-base ml-16">Info</a>
        </Link>

        <CartButton label="Cart" />

        <div className="ml-16 flex items-center">
          {themes.map((theme, index) => (
            <button
              className={`${styles['font-button']} ${currentTheme === index ? styles.active : null} font-button text-base flex justify-center items-center`}
              key={`${theme}-${index}`}
              onClick={() => setCurrentTheme(index)}
            ></button>
          ))}
        </div>
      </div>
    </header>
  )
}

export default MainNav