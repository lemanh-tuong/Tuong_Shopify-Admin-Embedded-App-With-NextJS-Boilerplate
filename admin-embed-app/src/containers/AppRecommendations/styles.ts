import { css, Theme } from 'wiloke-react-core';

export const container = css`
  debug: AppRecommendations__container;
  width: 100%;
  padding: 0 10%;
`;

export const apps = css`
  debug: AppRecommendations__apps;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const title = ({ colors }: Theme) => css`
  debug: AppRecommendations__title;
  text-align: center;
  color: ${colors.dark};
`;
export const description = ({ colors }: Theme) => css`
  debug: AppRecommendations__description;
  text-align: center;
  margin-bottom: 8px;
  color: ${colors.gray5};
`;
