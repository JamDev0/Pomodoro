import styled, { css } from 'styled-components'

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
  stopped: css``,
  onGoing: css`
    background-color: ${(props) => props.theme.colors.feedback.red[500]};

    &:hover {
      background-color: ${(props) => props.theme.colors.feedback.red[600]};
    }
  `,
  over: css``,
}

export const HomeContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  row-gap: 15px;

  flex-grow: 1;
  flex-shrink: 1;

  margin-top: 2.5rem;
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

export const InputsContainer = styled.div`
  display: flex;
  column-gap: 0.5rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  font-size: 1.125rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.base.title};
`

const BaseInput = styled.input`
  background-color: transparent;

  padding: 5px 8px;

  font-size: 1.125rem;

  color: ${(props) => props.theme.colors.base.title};

  border: 0;
  border-bottom: 2px solid ${(props) => props.theme.colors.base.title};

  &:focus {
    box-shadow: none;

    border-color: ${(props) => props.theme.colors.product.green[500]};
  }

  &:placeholder-shown:not(:focus) {
    color: ${(props) => props.theme.colors.base.placeholder};

    border-bottom-color: ${(props) => props.theme.colors.base.placeholder};
  }
`

export const NameInput = styled(BaseInput)`
  min-width: fit-content;

  flex: 1;

  &::placeholder {
    min-width: fit-content;

    flex: 1;
  }

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const TimeInput = styled(BaseInput)`
  width: 4rem;
`
