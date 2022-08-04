import { Circle } from 'phosphor-react'
import { StatusContainer } from './Status.styles'

export function Status() {
  return (
    <StatusContainer currentStatus="On going">
      <Circle weight="fill" />
      Concluido
    </StatusContainer>
  )
}
