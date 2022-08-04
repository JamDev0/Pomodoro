import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;

  width: 100%;

  padding: 50px 40px 0px 40px;

  & > img {
    width: 2.5rem;
  }

  & > div {
    display: flex;
    align-items: center;

    column-gap: 0.5rem;
  }
`
