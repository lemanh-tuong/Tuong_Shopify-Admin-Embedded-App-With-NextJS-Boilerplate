import { Modal as ModalAntd, ModalProps as ModalAntdProps } from 'antd';
import { FC } from 'react';
import { useStyleSheet, useTheme } from 'wiloke-react-core';
import * as css from './styles';

export interface ModalProps extends ModalAntdProps {}

export const Modal: FC<ModalProps> = ({ className = '', centered = true, ...props }) => {
  const { styles } = useStyleSheet();
  const theme = useTheme();
  return <ModalAntd {...props} centered={centered} className={`${className} ${styles(css.container(theme))}`} />;
};
