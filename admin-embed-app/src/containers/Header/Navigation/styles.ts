import { css, Theme } from 'wiloke-react-core';

export const container = css`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const link = ({ colors }: Theme) => css`
  debug: Navigation-link;
  text-decoration: none;
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  font-size: 14;
  padding: 11px 29px;
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
  color: ${colors.gray7} !important;
  :hover {
    color: ${colors.gray7} !important;
  }
`;

export const parent = css`
  position: relative;
  display: block;
`;

export const active = ({ colors }: Theme) => css`
  background-color: rgb(${colors.rgbGray8}) !important;
  color: rgb(${colors.rgbLight}) !important;
  &:hover {
    color: rgb(${colors.rgbLight}) !important;
  }
`;

export const chatButton = ({ colors }: Theme) => css`
  margin-left: 6px;
  background-color: ${colors.primary} !important;
  color: rgb(${colors.rgbLight}) !important;
  &:hover {
    color: rgb(${colors.rgbLight}) !important;
  }
`;
