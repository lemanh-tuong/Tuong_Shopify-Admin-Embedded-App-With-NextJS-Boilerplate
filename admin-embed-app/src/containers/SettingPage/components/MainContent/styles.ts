import { css, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme) => css`
  debug: PreviewContent__container;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: auto;
  min-width: 600px;
  height: 100%;
  position: relative;

  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${colors.gray2};
    box-shadow: none !important;
    outline: none !important;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.gray5};
    box-shadow: none !important;
    outline: none !important;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${colors.gray6};
    outline: none !important;
    box-shadow: none !important;
  }
`;
