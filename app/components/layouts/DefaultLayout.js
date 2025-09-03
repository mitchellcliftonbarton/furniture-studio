import MainNav from '../MainNav'
import MainFooter from '../MainFooter'
import MobileMenu from '../MobileMenu'

import FontdueProvider from 'fontdue-js/FontdueProvider'
import StoreModal from 'fontdue-js/StoreModal'
import 'fontdue-js/fontdue.css'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const Layout = ({ children }) => {
  const router = useRouter()

  const themesArray = ['theme-1', 'theme-2', 'theme-3']

  const [themes] = useState(themesArray)
  const [currentTheme, setCurrentTheme] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleRouteChange = () => {
      setMobileMenuOpen(false)
    }

    router.events.on('routeChangeStart', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  return (
    <FontdueProvider url={process.env.NEXT_PUBLIC_FONTDUE_URL}>
      <div className={`${themes[currentTheme]} main-wrapper`}>
        <MainNav
          currentTheme={currentTheme}
          setCurrentTheme={setCurrentTheme}
          themes={themes}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        <MobileMenu
          currentTheme={currentTheme}
          setCurrentTheme={setCurrentTheme}
          themes={themes}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        <main
          role="main"
          className="pt-[70px] lg:pt-0"
        >
          {children}
        </main>

        <MainFooter
          infoData={children.props.children[1].props.infoData}
          currentTheme={currentTheme}
        />

        <StoreModal />
      </div>
    </FontdueProvider>
  )
}

export default Layout
