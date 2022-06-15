import { Styles, Theme } from 'wiloke-react-core';

const HEADER_HEIGHT = 50;

export const container = ({ colors }: Theme): Styles => ({
  height: `${HEADER_HEIGHT}px`,
  backgroundColor: colors.light,
  borderBottom: `1px solid ${colors.gray3}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px',
});

export const close: Styles = {
  width: '36px',
  height: '36px',
  lineHeight: '36px',
  textAlign: 'center',
  cursor: 'pointer',
};
