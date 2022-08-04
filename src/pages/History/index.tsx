import { useEffect } from 'react'
import { HistoryTable } from './components/HistoryTable'
import { HistoryContainer } from './History.styles'

export function History() {
  useEffect(() => {
    document.title = 'Pomo - Histórico'
  }, [])

  return (
    <HistoryContainer>
      <h2>Meu histórico</h2>
      <HistoryTable />
    </HistoryContainer>
  )
}
