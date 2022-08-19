import { NumberContainer } from './Number.styles'

import { useTimer } from '../../../../../hooks/useTimer'

interface NumberProps {
  text: string
}

export function Number({ text }: NumberProps) {
  const { timer } = useTimer()

  const isTimerOver = timer ? timer.status === 'over' : false

  return <NumberContainer blink={isTimerOver}>{text}</NumberContainer>
}
