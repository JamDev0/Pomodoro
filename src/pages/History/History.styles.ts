import styled from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;

  padding: 0px 3.5rem 3.5rem 3.5rem;

  width: 100%;

  margin-top: 2rem;

  h2 {
    margin-bottom: 32px;

    font-weight: 700;
    font-size: 1.5rem;
    color: ${(props) => props.theme.colors.base.title};
  }
`
