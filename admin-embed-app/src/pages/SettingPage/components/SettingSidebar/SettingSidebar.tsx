import { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { View } from 'wiloke-react-core';
import * as styles from './styles';

const SettingTab = () => {
  return (
    <View css={styles.container}>
      <View css={styles.body}>Fields in setting tab</View>
    </View>
  );
};

const AdvanceTab = () => {
  return (
    <View css={styles.container}>
      <View css={styles.body}>Fields in advance tab</View>
    </View>
  );
};

export const SettingSidebar = () => {
  const _handleConfirmQuit = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = 'Changes you made may not be saved.';
  };

  useEffect(() => {
    window.addEventListener('beforeunload', _handleConfirmQuit);
    return () => {
      window.removeEventListener('beforeunload', _handleConfirmQuit);
    };
  }, []);

  return (
    <Routes>
      <Route path="/advanced" element={<AdvanceTab />} />
      <Route index element={<SettingTab />} />
    </Routes>
  );
};
