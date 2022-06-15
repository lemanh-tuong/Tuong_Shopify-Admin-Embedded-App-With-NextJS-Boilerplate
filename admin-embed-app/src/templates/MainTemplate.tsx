import { FC, ReactNode } from 'react';
import { View } from 'wiloke-react-core';
import * as styles from './styles';

interface MainTemplateProps {
  Header: () => ReactNode;
  Sidebar?: () => ReactNode;
  Content: () => ReactNode;
  Modals?: () => ReactNode;
}

export const MainTemplate: FC<MainTemplateProps> = ({ Header, Sidebar, Content, Modals }) => {
  return (
    <View css={styles.custom}>
      <View className="MainTemplate-custom__container" css={styles.container}>
        <View css={styles.header}>{Header()}</View>
        <View css={styles.mainContent}>
          {Sidebar && <View css={styles.sidebar}>{Sidebar()}</View>}
          <View css={styles.content}>{Content()}</View>
        </View>
        {Modals?.()}
      </View>
    </View>
  );
};
