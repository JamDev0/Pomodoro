import { Scroll, Timer } from 'phosphor-react'

import Icon from '../../assets/Icon.svg'

import { NavButton } from './NavButton'

import { HeaderContainer } from './Header.styles'

export function Header() {
  return (
    <HeaderContainer>
      <img src={Icon} alt="" />

      <div>
        <NavButton To="/" icon={<Timer />} description="Timer" />

        <NavButton To="/history" icon={<Scroll />} description="Histórico" />
      </div>
    </HeaderContainer>
  )
}
