import { NumberContainer } from './Number.styles'

import { useTimer } from '../../../../../hooks/useTimer'

interface NumberProps {
  text: string
}

export function Number({ text }: NumberProps) {
  const { timerStatus } = useTimer()

  const isTimerOver = timerStatus === 'over'

  return <NumberContainer blink={isTimerOver}>{text}</NumberContainer>
}
