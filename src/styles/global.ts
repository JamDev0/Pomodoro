import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0px;
        padding: 0px;

        box-sizing: border-box;

        -webkit-font-smoothing: antialiased;
    }

    :focus {
        outline: 0;

        box-shadow: 0 0 0 2px ${(props) =>
          props.theme.colors.product.green[500]};
    }

    body {
        display: flex;
        flex-direction: column;

        padding: 5rem 10rem;

        background-color: ${(props) => props.theme.colors.base.background};

        color: ${(props) => props.theme.colors.base.text};
    }

    body, input, textarea, button {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }
`
