import styled, { css } from 'styled-components'

interface StatusParams {
  currentStatus: 'Concluded' | 'Stopped' | 'On going'
}

const statusIndicatorColors = {
  Concluded: css`
    ${(props) => props.theme.colors.product.green[500]}
  `,
  Stopped: css`
    ${(props) => props.theme.colors.feedback.red[500]}
  `,
  'On going': css`
    ${(props) => props.theme.colors.feedback.yellow[500]}
  `,
}

export const StatusContainer = styled.span<StatusParams>`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;

  svg {
    fill: ${(props) => {
      return statusIndicatorColors[props.currentStatus]
    }};
  }
`
