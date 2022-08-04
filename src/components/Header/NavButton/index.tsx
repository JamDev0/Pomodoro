import { ReactNode } from 'react'

import { useNavigation } from '../../../hooks/useNavigation'

import { NavButtonContainer } from './NavButton.styles'

import { useLocation } from 'react-router-dom'

interface NavButtonProps {
  icon: ReactNode
  description: string
  To: string
}

export function NavButton({ icon, description, To }: NavButtonProps) {
  const { handleNavigation } = useNavigation()

  const { pathname } = useLocation()

  function isThisTheCurrentPage() {
    return pathname === To
  }

  return (
    <NavButtonContainer
      selected={isThisTheCurrentPage()}
      onClick={() => handleNavigation(To)}
    >
      <span>{description}</span>
      {icon}
    </NavButtonContainer>
  )
}
