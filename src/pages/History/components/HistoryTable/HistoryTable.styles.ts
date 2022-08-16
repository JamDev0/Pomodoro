import styled from 'styled-components'

export const HistoryTableContainer = styled.div`
  flex: 1;
  overflow: auto;

  table {
    border-collapse: collapse;

    width: 100%;

    min-width: 600px;

    thead {
      th {
        font-size: 0.875rem;
        font-weight: 700;
        text-align: left;
        color: ${(props) => props.theme.colors.base.title};

        padding: 1rem;

        background-color: ${(props) =>
          props.theme.colors.base.elements.tertiary};

        &:first-child {
          border-top-left-radius: 8px;
          padding-left: 1.5rem;
        }

        &:last-child {
          border-top-right-radius: 8px;
          padding-right: 1.5rem;
        }
      }
    }

    tbody {
      row-gap: 15px;
    }
  }
`
