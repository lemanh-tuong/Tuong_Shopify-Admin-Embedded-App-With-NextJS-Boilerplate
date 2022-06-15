import { css, Theme } from 'wiloke-react-core';

export const container = css`
  debug: ModalRaing__container;
  padding: 10px;
`;

export const title = ({ colors }: Theme) => css`
  debug: ModalRaing__title;
  font-size: 25px;
  color: ${colors.gray9};
  font-weight: 600;
  text-align: center;
  margin-bottom: 22px;
`;

export const message = css`
  debug: ModalRaing__message;
  font-size: 17px;
  text-align: center;
`;
