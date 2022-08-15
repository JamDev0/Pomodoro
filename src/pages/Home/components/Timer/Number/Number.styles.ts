import styled, { css, keyframes } from 'styled-components'

interface NumberContainerParams {
  blink: boolean
}

const textBlinkAnimation = (initialColor: string) => keyframes`
  0% {
              color: ${initialColor};
            }
            100% {
              color: transparent;
            }
`

export const NumberContainer = styled.span<NumberContainerParams>`
  height: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0px 10px;

  border-radius: 8px;

  font-size: 10rem;
  font-weight: 700;
  color: ${(params) => params.theme.colors.base.title};

  background-color: ${(params) => params.theme.colors.base.elements.secondary};

  ${(params) =>
    params.blink
      ? css`
          animation-name: ${textBlinkAnimation(params.theme.colors.base.title)};
          animation-duration: 550ms;
          animation-iteration-count: infinite;
          animation-direction: alternate;
          animation-timing-function: ease-in;
        `
      : css``}
`
