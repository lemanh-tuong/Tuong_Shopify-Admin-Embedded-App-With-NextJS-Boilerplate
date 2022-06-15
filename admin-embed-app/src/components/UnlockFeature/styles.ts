import { css } from 'wiloke-react-core';

export const container = css`
  debug: UnlockFeature__container;
  position: relative;
`;

export const content = (isDisable: boolean) => css`
  debug: UnlockFeature__content;
  opacity: ${isDisable ? 0.5 : 1};
`;
