import styled, { css, keyframes } from 'styled-components'

import { timerStatusTypes } from '../../hooks/useTimer'

interface StartButtonParams {
  timerStatus: timerStatusTypes
}

const buttonStyleBasedOnTimerStatus = {
  idle: css`
    background-color: ${(props) => props.theme.colors.product.green[500]};

    &:hover:not(:disabled) {
      background-color: ${(props) => props.theme.colors.product.green[600]};
    }

    &:disabled {
      opacity: 0.7;

      cursor: not-allowed;
    }
  `,
  stopped: css`
    background-color: ${(props) => props.theme.colors.product.green[500]};

    &:hover {
      background-color: ${(props) => props.theme.colors.product.green[600]};
    }
  `,
  onGoing: css`
    background-color: ${(props) => props.theme.colors.feedback.red[500]};

    &:hover {
      background-color: ${(props) => props.theme.colors.feedback.red[600]};
    }
  `,
  over: css`
    background-color: ${(props) => props.theme.colors.product.green[500]};

    &:hover {
      background-color: ${(props) => props.theme.colors.product.green[600]};
    }
  `,
}

export const HomeContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  row-gap: 15px;

  flex-grow: 1;
  flex-shrink: 1;

  margin-top: 20px;
`

export const StartButton = styled.button<StartButtonParams>`
  width: 100%;

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
  color: ${(props) => props.theme.colors.base.title};

  transition: all 200ms ease-in-out;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  ${(props) => {
    return buttonStyleBasedOnTimerStatus[props.timerStatus]
  }}
`

const FadeOutTimerTitleAnimation = keyframes`
  0% {
    opacity: 1;
    filter: brightness(1) grayscale(0);
  }

  100% {
    opacity: 0.6;
    filter: brightness(0.6) grayscale(1);
  }
`

export const TimerTitle = styled.h1`
  font-size: 2.5rem;
  color: ${(params) => params.theme.colors.base.title};
  text-decoration: underline;
  text-decoration-color: ${(params) => params.theme.colors.product.green[500]};
  text-decoration-thickness: 1;

  animation-name: ${FadeOutTimerTitleAnimation};
  animation-delay: 5s;
  animation-duration: 300ms;
  animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);
  animation-fill-mode: forwards;
`
