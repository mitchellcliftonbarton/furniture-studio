import { createContext, useContext, useState } from 'react'

// GLOBAL STATE
const SiteContext = createContext()

export function SiteContextWrapper({ children }) {
  let stateObj = {
    currentTheme: 0,
    themes: [
      'theme-1',
      'theme-2',
      'theme-3'
    ]
  }

  const [state, setState] = useState(stateObj)

  return (
    <SiteContext.Provider
      value={state}
    >
      {children}
    </SiteContext.Provider>
  )
}

export function useSiteContext() {
  const state = useContext(SiteContext)

  if (state === undefined) {
    throw new Error('useSiteContext must be used within a SiteContextProvider')
  }

  return state
}