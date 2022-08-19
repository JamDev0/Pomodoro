import { formatDistanceToNow } from 'date-fns'
import { Status } from './Status'
import { HistoryTableRowContainer } from './HistoryTableRow.styles'

import ptBr from 'date-fns/locale/pt-BR'
import { timerCompleted } from '../../../../../reducers/timer/reducer'

interface HistoryTableRowProps extends timerCompleted {}

export function HistoryTableRow({
  taskName,
  duration,
  startDate,
  status,
}: HistoryTableRowProps) {
  return (
    <HistoryTableRowContainer>
      <td>{taskName}</td>
      <td>{duration} minutos</td>
      <td>
        {formatDistanceToNow(new Date(startDate), {
          locale: ptBr,
          addSuffix: true,
        })}
      </td>
      <td>
        <Status status={status} />
      </td>
    </HistoryTableRowContainer>
  )
}
