import MainNav from '../MainNav'
import MainFooter from '../MainFooter'
import CatalogFooter from '../CatalogFooter'

import FontdueProvider from 'fontdue-js/FontdueProvider'
import StoreModal from 'fontdue-js/StoreModal'
import 'fontdue-js/fontdue.css'

import { useState } from 'react'

const Layout = ({ children }) => {
  // console.log(children)
  
  const themesArray = [
    'theme-1',
    'theme-2',
    'theme-3'
  ]

  const [themes] = useState(themesArray)
  const [currentTheme, setCurrentTheme] = useState(0)

  return (
    <FontdueProvider url={process.env.NEXT_PUBLIC_FONTDUE_URL}>
      <div className={`${themes[currentTheme]} main-wrapper`}>
        <MainNav
          currentTheme={currentTheme}
          setCurrentTheme={setCurrentTheme}
          themes={themes}
        />
        <main role="main">{children}</main>

        <CatalogFooter catalogData={children.props.catalogData}/>
        <MainFooter infoData={children.props.infoData} />

        <StoreModal />
      </div>
    </FontdueProvider>
  )
}

export default Layout