import { Retry } from 'src/components/Retry/Retry';
import { MainTemplate } from 'src/templates/MainTemplate';
import { AlertAppExtension } from 'src/containers/AlertAppExtension';
import { Header } from 'src/containers/Header';
import { initializationSelector, settingSelector } from 'src/store/selectors';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View } from 'wiloke-react-core';
import { useGetDefaultSetting } from './actions/actionSetting';
import { MainContent } from './components/MainContent/MainContent';
import { ModalRating } from './components/ModalRating/ModalRating';
import { ModalSaveComplete } from './components/ModalSaveComplete/ModalSaveComplete';
import { SettingSidebar } from './components/SettingSidebar/SettingSidebar';

const Modals = () => {
  return (
    <>
      <ModalSaveComplete />
      <ModalRating />
    </>
  );
};

// TODO: I18n
export const SettingPage: FC = () => {
  const getDefaultSetting = useGetDefaultSetting();
  const { statusRequest } = useSelector(settingSelector);
  const { appExtensionActived, statusInitialization } = useSelector(initializationSelector);

  useEffect(() => {
    if (statusRequest !== 'success') {
      getDefaultSetting.request(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (statusRequest === 'failure') {
    return <Retry onClick={() => getDefaultSetting.request(undefined)} />;
  }

  return (
    <View css={{ padding: '8px' }}>
      {statusInitialization === 'success' && !appExtensionActived && <AlertAppExtension />}
      <MainTemplate Header={Header} Sidebar={SettingSidebar} Content={MainContent} Modals={Modals} />
    </View>
  );
};
