import { formatRelative } from 'date-fns'
import { timerCompleted } from '../../../../../hooks/useTimer'
import { Status } from '../Status'
import { HistoryTableRowContainer } from './HistoryTableRow.styles'

import ptBr from 'date-fns/locale/pt-BR'

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
        {formatRelative(new Date(), startDate, {
          locale: ptBr,
        })}
      </td>
      <td>
        <Status status={status} />
      </td>
    </HistoryTableRowContainer>
  )
}
