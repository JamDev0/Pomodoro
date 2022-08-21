import { ReactNode } from 'react'

import { useLocation } from 'react-router-dom'

import { useNavigation } from '../../../hooks/useNavigation'

import { NavButtonContainer } from './NavButton.styles'

interface NavButtonProps {
  icon: ReactNode
  description: string
  To: string
}

export function NavButton({ icon, description, To }: NavButtonProps) {
  const { handleNavigation } = useNavigation()

  const { pathname } = useLocation()

  const isSelected = pathname === To

  return (
    <NavButtonContainer
      selected={isSelected}
      onClick={() => handleNavigation(To)}
    >
      <span>{description}</span>
      {icon}
    </NavButtonContainer>
  )
}
