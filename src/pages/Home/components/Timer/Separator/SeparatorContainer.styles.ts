import styled from 'styled-components'

export const SeparatorContainer = styled.span`
  height: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0px 10px;

  font-size: 10rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.product.green[500]};
`
