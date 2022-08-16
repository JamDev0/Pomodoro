import { useTimer } from '../../../../hooks/useTimer'
import { HistoryTableContainer } from './HistoryTable.styles'
import { HistoryTableRow } from './HistoryTableRow'

export function HistoryTable() {
  const { timersList } = useTimer()

  return (
    <HistoryTableContainer>
      <table>
        <thead>
          <tr>
            <th>Tarefa</th>
            <th>Duração</th>
            <th>Início</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {timersList.map((timer) => {
            return <HistoryTableRow {...timer} key={timer.id} />
          })}
        </tbody>
      </table>
    </HistoryTableContainer>
  )
}
