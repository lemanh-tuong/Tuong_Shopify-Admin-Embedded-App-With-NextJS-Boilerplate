import { Header } from 'src/containers/Header';
import { MainTemplate } from 'src/templates/MainTemplate';
import { View } from 'wiloke-react-core';

// TODO: I18n
export const PricingPage = () => {
  return <MainTemplate Header={Header} Content={() => <View>Pricing</View>} />;
};
