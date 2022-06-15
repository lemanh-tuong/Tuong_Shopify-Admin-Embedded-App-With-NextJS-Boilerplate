import { css, Theme } from 'wiloke-react-core';

export const container = css`
  debug: XinRate__container;
  padding: 10px;
  text-align: center;
`;

export const title = ({ colors }: Theme) => css`
  debug: XinRate__title;
  font-size: 18px;
  color: ${colors.gray9};
  font-weight: 500;
`;

export const message = css`
  debug: XinRate__message;
  font-size: 13px;
`;

export const containerNoti = css`
  debug: ModalSaveComplete__container;
  margin-left: 16px;
  line-height: 1.2;
`;

export const titleNoti = css`
  debug: ModalSaveComplete__title;
  font-weight: 500;
  font-size: 24px;
  margin-bottom: 8px;
  margin-top: 4px;
  text-align: center;
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
