import { Scroll, Timer } from 'phosphor-react'
import Icon from '../../assets/Icon.svg'

import { HeaderContainer } from './Header.styles'
import { NavButton } from './NavButton'

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
