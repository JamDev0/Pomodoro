import { useTimer } from '../../../../../hooks/useTimer'

import { NumberContainer } from './Number.styles'

interface NumberProps {
  text: string
}

export function Number({ text }: NumberProps) {
  const { timer } = useTimer()

  const isTimerOver = timer ? timer.status === 'over' : false

  return <NumberContainer blink={isTimerOver}>{text}</NumberContainer>
}
