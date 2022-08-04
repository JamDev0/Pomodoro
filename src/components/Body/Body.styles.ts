import styled from 'styled-components'

export const BodyContainer = styled.section`
  width: 100%;
  height: calc(100vh - 10rem);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  background-color: ${(props) => props.theme.colors.base.elements.primary};

  border-radius: 8px;

  padding: 0px 0px 36px 0px;
`
