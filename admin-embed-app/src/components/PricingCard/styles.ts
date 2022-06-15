import { css, Theme } from 'wiloke-react-core';

export const container = css`
  padding: 15px;
`;

export const text = css`
  margin: 5px 0;
  font-size: 14px;
`;

export const description = css`
  margin: 10px 0 10px;
  font-weight: 500;
`;

export const title = (isActive: boolean) => ({ colors }: Theme) => css`
  position: relative;
  /* font-weight: 400; */

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background-color: ${isActive ? colors.light : colors.gray8};
  }
`;
