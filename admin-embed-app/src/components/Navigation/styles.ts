import { css } from 'wiloke-react-core';
import { RgbColors } from 'wiloke-react-core/dist/types/RgbColors';

export const container = css`
  display: flex;
  width: 100%;
`;

export const link = css`
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
`;

export const parent = css`
  position: relative;
  display: block;
`;

export const active = (color: RgbColors) => css`
  background-color: rgba(${color.rgbGray8});
  color: rgb(${color.rgbLight});
  &:hover {
    color: rgb(${color.rgbLight});
  }
`;
