import { Separator } from './Separator'
import { Number } from './Number'
import { TimerContainer } from './Timer.styles'
import { useTimer } from '../../../../hooks/useTimer'

export function Timer() {
  const { timerTimeToDisplay } = useTimer()

  return (
    <TimerContainer>
      <Number text={timerTimeToDisplay[0]} />
      <Number text={timerTimeToDisplay[1]} />
      <Separator />
      <Number text={timerTimeToDisplay[2]} />
      <Number text={timerTimeToDisplay[3]} />
    </TimerContainer>
  )
}
