import { css, Theme } from 'wiloke-react-core';

const HEADER_HEIGHT = 65;

export const custom = ({ colors }: Theme) => css`
  padding: 8px;
  .MainTemplate-custom__container::-webkit-scrollbar {
    width: 5px;
    border-radius: 5px;
  }

  .MainTemplate-custom__container::-webkit-scrollbar-track {
    background: ${colors.gray2};
    box-shadow: none !important;
    outline: none !important;
  }

  .MainTemplate-custom__container::-webkit-scrollbar-thumb {
    background: ${colors.gray5};
    box-shadow: none !important;
    outline: none !important;
    border-radius: 10px;
  }

  .MainTemplate-custom__container::-webkit-scrollbar-thumb:hover {
    background: ${colors.gray6};
    outline: none !important;
    box-shadow: none !important;
  }
`;

export const container = ({ colors }: Theme) => css`
  debug: MainTemplate__container;
  border: 1px solid ${colors.gray3};
  border-radius: 10px;
  position: relative;
  height: calc(100vh - 16px);
  display: flex;
  flex-direction: column;
  min-width: 940px;
  overflow: hidden auto;
`;

export const header = ({ colors }: Theme) => css`
  debug: MainTemplate__header;
  height: ${HEADER_HEIGHT}px;
  padding: 10px 20px;
  border-bottom: 1px solid ${colors.gray3};
`;

export const mainContent = css`
  debug: MainTemplate__mainContent;
  height: calc(100% - ${HEADER_HEIGHT}px);
  display: flex;
`;

export const sidebar = css`
  debug: MainTemplate__sidebar;
  width: 367px;
  flex-basis: 367px;
  flex-shrink: 0;
`;

export const content = css`
  debug: MainTemplate__content;
  flex: 1 1 auto;
  position: relative;
`;
