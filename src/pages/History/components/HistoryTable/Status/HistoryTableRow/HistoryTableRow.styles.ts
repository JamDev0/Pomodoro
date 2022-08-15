import styled from "styled-components";

export const HistoryTableRowContainer = styled.tr`
  td {
    border-top: 4px solid
      ${(props) => props.theme.colors.base.elements.primary};

    background-color: ${(props) =>
      props.theme.colors.base.elements.secondary};

    font-size: 0.875rem;
    font-weight: 400;

    padding: 1rem;

    &:first-child {
      width: 50%;
      padding-left: 1.5rem;
    }

    &:last-child {
      padding-right: 1.5rem;
    }
  }
`