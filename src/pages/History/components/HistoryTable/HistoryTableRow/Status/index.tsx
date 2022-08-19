import { Circle } from 'phosphor-react'
import { timerStatusTypes } from '../../../../../../hooks/useTimer'
import { StatusContainer } from './Status.styles'

interface StatusProps {
  status: timerStatusTypes
}

export function Status({ status }: StatusProps) {
  function convertRawStatusToReadable() {
    switch (status) {
      case 'onGoing':
        return 'Em progresso'

      case 'canceled':
        return 'Cancelado'

      case 'over':
        return 'Concluído'

      case 'stopped':
        return 'Pausado'
    }
  }

  return (
    <StatusContainer currentStatus={status}>
      <Circle weight="fill" />
      {convertRawStatusToReadable()}
    </StatusContainer>
  )
}
