import { createContext, ReactNode, useContext, useState } from 'react'

import { useNavigate } from 'react-router-dom'

interface navigationContextInterface {
  currentPage: string
  handleNavigation: (arg: string) => void
  setCurrentPage: () => void
}

interface NavigationProviderProps {
  children: ReactNode
}

const navigationContext = createContext<navigationContextInterface>(
  {} as navigationContextInterface,
)

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [currentPage, setCurrentPage] = useState<string>('Home')

  const navigate = useNavigate()

  function handleNavigation(To: string) {
    navigate(To)
  }

  return (
    <navigationContext.Provider
      value={{ currentPage, setCurrentPage, handleNavigation }}
    >
      {children}
    </navigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(navigationContext)
  return context
}
