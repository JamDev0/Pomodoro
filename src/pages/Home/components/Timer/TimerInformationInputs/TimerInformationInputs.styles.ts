import styled from 'styled-components'

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
