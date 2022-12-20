import { css } from 'wiloke-react-core';

export const container = css`
  debug: ModalSaveComplete__container;
  margin-left: 16px;
`;

export const title = css`
  debug: ModalSaveComplete__title;
  font-weight: 500;
  font-size: 24px;
`;

export const description = css`
  debug: ModalSaveComplete__description;
  font-size: 15px;
  margin-bottom: 12px;
  & a {
    margin: 0px 4px;
    text-decoration: underline;
  }
`;
