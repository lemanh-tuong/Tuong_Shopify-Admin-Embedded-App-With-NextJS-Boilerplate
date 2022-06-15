import { FC } from 'react';
import { FontAwesome, Text, View } from 'wiloke-react-core';
import * as styles from './styles';

export interface ModalHeaderProps {
  title: string;
  onClose?: () => void;
}

export const ModalHeader: FC<ModalHeaderProps> = ({ title, onClose }) => {
  return (
    <View css={styles.container}>
      <Text tagName="h5">{title}</Text>
      <FontAwesome type="fal" name="times" size={24} color="gray8" colorHover="primary" css={styles.close} onClick={onClose} />
    </View>
  );
};
