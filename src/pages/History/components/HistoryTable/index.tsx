import { HistoryTableContainer } from './HistoryTable.styles'
import { Status } from './Status'

export function HistoryTable() {
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
          <tr>
            <td>Correção de erros</td>
            <td>25 minutos</td>
            <td>Há cerca de 2 meses</td>
            <td>Concluido</td>
          </tr>
          <tr>
            <td>Correção de erros</td>
            <td>25 minutos</td>
            <td>Há cerca de 2 meses</td>
            <td>
              <Status />
            </td>
          </tr>
        </tbody>
      </table>
    </HistoryTableContainer>
  )
}
