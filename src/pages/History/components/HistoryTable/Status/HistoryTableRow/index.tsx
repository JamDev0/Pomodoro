import { timerCompleted } from "../../../../../../hooks/useTimer";
import { HistoryTableRowContainer } from "./HistoryTableRow.styles";

interface  HistoryTableRowProps extends timerCompleted {

}

export function HistoryTableRow({}: HistoryTableRowProps) {
    return (
        <HistoryTableRowContainer>
            <td>Correção de erros</td>
            <td>25 minutos</td>
            <td>Há cerca de 2 meses</td>
            <td>Concluido</td>
        </HistoryTableRowContainer>
    )
}