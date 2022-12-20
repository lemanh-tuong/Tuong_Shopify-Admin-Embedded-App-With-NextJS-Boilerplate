import { css, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme) => css`
  debug: SettingSidebar__container;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 1;
  background-color: ${colors.light};
  height: 100%;
`;

export const body = ({ colors }: Theme) => css`
  debug: SettingSidebar__body;
  padding: 20px;
  padding-bottom: 60px;
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1 1 auto;

  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${colors.light};
    box-shadow: none !important;
    outline: none !important;
  }

  &::-webkit-scrollbar-thumb {
    background: #e3e5e6;
    box-shadow: none !important;
    outline: none !important;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #e3e5e6;
    outline: none !important;
    box-shadow: none !important;
  }
`;
