import styled, { css } from 'styled-components'

interface NavButtonContainerInterface {
  selected: boolean
}

export const NavButtonContainer = styled.button<NavButtonContainerInterface>`
  box-sizing: content-box;

  position: relative;

  width: fit-content;
  height: fit-content;

  width: 1.7rem;
  height: 1.7rem;
  line-height: 0px;

  cursor: pointer;

  padding: 9px 13px 7px 13px;

  border: 0px;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;

  background-color: transparent;

  svg {
    width: 100%;
    height: 100%;
  }

  span {
    display: none;

    position: absolute;
    top: -9px;
    left: 50%;
    z-index: 2;

    transform: translateX(-50%) translateY(-100%);

    line-height: normal;
    font-size: 0.875rem;
    font-weight: 700;
    color: ${(props) => props.theme.colors.base.title};

    border-radius: 5px;

    padding: 8px 16px;

    background-color: ${(props) => props.theme.colors.base.background};

    &::before {
      content: '';

      position: absolute;
      top: 100%;
      left: 50%;
      z-index: -2;

      transform: translateX(-50%) translateY(-50%) rotate(45deg);

      width: 12px;
      height: 12px;

      background-color: ${(props) => props.theme.colors.base.background};
    }
  }

  ${(props) =>
    props.selected === true
      ? css`
          color: ${(props) => props.theme.colors.product.green[500]};
        `
      : css`
          color: ${(props) => props.theme.colors.base.title};
        `}

  &:hover {
    border-bottom-color: ${(props) => props.theme.colors.product.green[500]};

    span {
      display: initial;
    }
  }

  &:focus {
    box-shadow: none;
  }
`
