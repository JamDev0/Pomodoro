import styled, { css } from 'styled-components'

import { timerStatusTypes } from '../../../../reducers/timer/reducer'

interface MainButtonContainerParams {
  timerStatus: timerStatusTypes
}

const buttonStyleBasedOnTimerStatus = {
  idle: css`
    background-color: ${(params) => params.theme.colors.product.green[500]};

    &:hover:not(:disabled) {
      background-color: ${(params) => params.theme.colors.product.green[600]};
    }

    &:disabled {
      opacity: 0.7;

      cursor: not-allowed;
    }
  `,
  stopped: css`
    background-color: ${(params) => params.theme.colors.product.green[500]};

    &:hover {
      background-color: ${(params) => params.theme.colors.product.green[600]};
    }
  `,
  onGoing: css`
    background-color: ${(params) => params.theme.colors.feedback.red[500]};

    flex-grow: 1;
    flex-shrink: 1;

    &:hover {
      background-color: ${(params) => params.theme.colors.feedback.red[600]};
    }
  `,
  over: css`
    background-color: ${(params) => params.theme.colors.product.green[500]};

    &:hover {
      background-color: ${(params) => params.theme.colors.product.green[600]};
    }
  `,
  canceled: css``,
}

export const MainButtonContainer = styled.button<MainButtonContainerParams>`
  width: 100%;

  flex: 1 1 0;

  height: min-content;

  display: flex;
  column-gap: 0.5rem;
  align-items: center;
  justify-content: center;

  padding: 17px 10px;

  cursor: pointer;

  border: 0;
  border-radius: 8px;

  font-size: 1rem;
  font-weight: 700;
  color: ${(params) => params.theme.colors.base.title};

  transition: all 200ms ease-in-out;

  ${(params) => {
    return buttonStyleBasedOnTimerStatus[params.timerStatus]
  }}

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`
