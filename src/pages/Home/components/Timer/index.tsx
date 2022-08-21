import { useTimer } from '../../../../hooks/useTimer'

import { TimerContainer } from './Timer.styles'

import { Separator } from './Separator'

import { Number } from './Number'

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
