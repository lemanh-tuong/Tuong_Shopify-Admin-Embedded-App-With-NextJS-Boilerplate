import { css, Theme } from 'wiloke-react-core';

export const container = css`
  debug: FAQs__container;
  padding: 32px;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const title = ({ colors }: Theme) => css`
  debug: FAQs__title;
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 8px;
  color: ${colors.gray9};
`;

export const description = css`
  debug: FAQs__description;
  margin-bottom: 16px;
`;

export const box = ({ colors }: Theme) => css`
  debug: FAQs__box;
  padding: 16px;
  border-radius: 10px;
  background-color: ${colors.light};
  margin-bottom: 16px;
`;
