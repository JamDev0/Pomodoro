import styled, { css } from 'styled-components'
import { timerStatusTypes } from '../../../../../hooks/useTimer'

interface StatusParams {
  currentStatus: timerStatusTypes
}

const statusIndicatorColors = {
  over: css`
    ${(params) => params.theme.colors.product.green[500]}
  `,
  canceled: css`
    ${(params) => params.theme.colors.feedback.red[500]}
  `,
  onGoing: css`
    ${(params) => params.theme.colors.feedback.yellow[500]}
  `,
  idle: css``,
  stopped: css``,
}

export const StatusContainer = styled.span<StatusParams>`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;

  svg {
    fill: ${(params) => {
      return statusIndicatorColors[params.currentStatus]
    }};
  }
`
