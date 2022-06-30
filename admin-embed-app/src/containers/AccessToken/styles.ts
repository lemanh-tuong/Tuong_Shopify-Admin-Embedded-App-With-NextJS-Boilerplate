import { css, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme) => css`
  debug: AccessToken__container;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(${colors.rgbDark}, 0.8);
  display: flex;
  align-items: center;
`;

export const content = ({ colors }: Theme) => css`
  debug: AccessToken__content;
  padding: 20px 30px;
  background: ${colors.light};
  border-radius: 10px;
  max-width: 800px;
  text-align: center;
  margin: 0px auto;
`;

export const title = css`
  debug: AccessToken__title;
  font-size: 16px;
  font-weight: 500;
`;

export const button = ({ colors }: Theme) => css`
  background: ${colors.primary};
  color: ${colors.light};
  padding: 12px 16px;
  border-radius: 10px;
  margin-top: 12px;
  display: inline-block;
  cursor: pointer;
`;
