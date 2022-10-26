// Styles
import styles from '../styles/MainNav.module.scss'

// Components
import Link from 'next/link'
import CartButton from 'fontdue-js/CartButton'

// React
// import { useState } from 'react'

const MainNav = ({ currentTheme, setCurrentTheme, themes, mobileMenuOpen, setMobileMenuOpen }) => {
  // const [scrolled, setScrolled] = useState(false)
  // const [lastScrollTop, setLastScrollTop] = useState(0)

  // let scrollWatch = () => {
  //   let scrollTop = window.pageYOffset || window.scrollY

  //   if (scrollTop > lastScrollTop) {
  //     if (!scrolled) {
  //       setScrolled(true)
  //       console.log('scrolling down', scrolled)
  //     }
  //   } else {
  //     if (scrolled) {
  //       setScrolled(false)
  //       console.log('scrolling up', scrolled)
  //     }
  //   }

  //   const val = scrollTop <= 0 ? 0 : scrollTop
  //   setLastScrollTop(val)
  // }

  // if (typeof window !== "undefined") {
  //   window.addEventListener('scroll', scrollWatch)
  // }

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header 
      id={styles.nav} 
      className={`fixed top-0 left-0 w-full def-x flex justify-between items-center`}
    >
      <Link href="/">
        <a className={`${styles['home-link']} text-md fade hidden lg:inline-block`}>Furniture</a>
      </Link>

      <div 
        className={`flex lg:hidden items-center`}
      >
        <Link href="/">
          <a className='mr-3 text-md'>Furniture</a>
        </Link>

        <button onClick={() => toggleMenu()} className={`${styles['mobile-button']} ${mobileMenuOpen ? styles.open : null}`}>
          <svg className={styles['carat-down']} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.6464 0.646447C12.8417 0.451184 13.1583 0.451184 13.3536 0.646447C13.5488 0.841709 13.5488 1.15829 13.3536 1.35355L12.6464 0.646447ZM7 7L7.35355 7.35355C7.15829 7.54882 6.84171 7.54882 6.64645 7.35355L7 7ZM0.646446 1.35355C0.451184 1.15829 0.451184 0.84171 0.646446 0.646448C0.841709 0.451186 1.15829 0.451185 1.35355 0.646448L0.646446 1.35355ZM13.3536 1.35355L7.35355 7.35355L6.64645 6.64645L12.6464 0.646447L13.3536 1.35355ZM6.64645 7.35355L0.646446 1.35355L1.35355 0.646448L7.35355 6.64645L6.64645 7.35355Z" fill="#323232"/>
          </svg>
        </button>
      </div>

      <div className="flex items-center">
        <Link href="/info">
          <a className="text-md ml-8 lg:ml-16 fade">Info</a>
        </Link>

        <CartButton label="Cart" />

        <div className="ml-16 hidden lg:flex items-center">
          {themes.map((theme, index) => (
            <button
              className={`${styles['font-button']} ${currentTheme === index ? styles.active : null} font-button text-md flex justify-center items-center`}
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