import { useTimer } from '../../hooks/useTimer'

import { HistoryTable } from './components/HistoryTable'

import { HistoryContainer } from './History.styles'

export function History() {
  const { timer, timerTimeToDisplay } = useTimer()

  const timerHasStarted = timer !== null

  document.title = timerHasStarted
    ? `Pomo - Histórico ${timerTimeToDisplay[0]}${timerTimeToDisplay[1]}:${timerTimeToDisplay[2]}${timerTimeToDisplay[3]}`
    : `Pomo - Histórico`

  return (
    <HistoryContainer>
      <h2>Meu histórico</h2>
      <HistoryTable />
    </HistoryContainer>
  )
}
