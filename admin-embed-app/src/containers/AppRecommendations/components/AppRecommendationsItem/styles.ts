import { css, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme) => css`
  debug: AppRecommendationsItem__container;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0px 2px 4px rgba(${colors.rgbDark}, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${colors.light};
`;

export const header = css`
  debug: AppRecommendationsItem__header;
`;
export const body = css`
  debug: AppRecommendationsItem__body;
  padding: 4px 10px 0px 10px;
`;
export const footer = css`
  debug: AppRecommendationsItem__footer;
  padding: 0px 10px 13px 10px;
  margin-top: 6px;
`;

export const image = css`
  debug: AppRecommendationsItem__image;
  width: 100%;
`;

export const appName = ({ colors }: Theme) => css`
  debug: AppRecommendationsItem__appName;
  color: ${colors.dark};
  &:hover {
    color: ${colors.primary};
  }
`;

export const ratings = ({ colors }: Theme) => css`
  debug: AppRecommendationsItem__ratings;
  font-size: 12px;
  color: ${colors.gray5};
  & i {
    font-size: 13px;
    color: ${colors.quaternary};
  }
`;

export const price = ({ colors }: Theme) => css`
  debug: AppRecommendationsItem__price;
  font-size: 10px;
  color: ${colors.gray5};
`;

export const totalRatings = ({ colors }: Theme) => css`
  debug: AppRecommendationsItem__totalRatings;
  font-size: 10px;
  color: ${colors.gray5};
`;

export const moreInfo = ({ colors }: Theme) => css`
  debug: AppRecommendationsItem__moreInfo;
  font-size: 12px;
  color: ${colors.primary};
`;

export const button = ({ colors }: Theme) => css`
  debug: AppRecommendationsItem__button;
  font-size: 12px;
  color: ${colors.primary};
  border: 0.5px solid ${colors.primary};
  background-color: ${colors.light};
  padding: 4px 6px;
  border-radius: 4px;
`;

export const flex = css`
  debug: AppRecommendationsItem__flex;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
