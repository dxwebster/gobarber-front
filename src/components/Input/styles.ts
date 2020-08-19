import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid #232129;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  /* Quando a propriedade isFocused for true, adicionar o css */
  /* Ou seja, quando o input tiver focado, deixa o texto e borda laranjas */
  ${(props) =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

/* Quando a propriedade isFilled for true, adiciona o css */
/* Ou seja, quando o input estiver preenchido, mantém o texto laranja */
    ${(props) =>
      props.isFilled &&
      css`
        color: #ff9000;
      `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #fff;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
