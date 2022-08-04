import styled from 'styled-components'

export const NumberContainer = styled.span`
  height: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0px 10px;

  border-radius: 8px;

  font-size: 10rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.base.title};

  background-color: ${(props) => props.theme.colors.base.elements.secondary};
`
