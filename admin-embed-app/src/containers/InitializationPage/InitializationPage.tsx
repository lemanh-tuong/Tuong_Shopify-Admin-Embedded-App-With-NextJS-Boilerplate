import { Retry } from 'src/components/Retry/Retry';
import { useAppBridge } from '@shopify/app-bridge-react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ActivityIndicator, Text, View } from 'wiloke-react-core';
import { useGetCurrentPlan } from '../PricingPage/actions/actionPlans';
import { initializationSelector } from '../selectors';
import { useInitialization } from './actions/actionInitializationPage';
import * as styles from './styles';

export const InitializationPage = () => {
  const { statusInitialization, shopDomain, themeId } = useSelector(initializationSelector);

  const app = useAppBridge();
  const init = useInitialization();
  const getCurrentPlan = useGetCurrentPlan();

  useEffect(() => {
    init.request({ app });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app]);

  useEffect(() => {
    if (statusInitialization === 'success' && themeId) {
      getCurrentPlan.request(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusInitialization]);

  if (statusInitialization === 'success' && shopDomain && !themeId) {
    return (
      <View css={styles.container}>
        <Text css={{ textAlign: 'center', fontSize: '22px', marginBottom: '10px' }}>
          We can't detect theme in your store. Make sure you've activated a theme and refresh the browser
        </Text>
        <Retry
          retryText="Active now"
          onClick={() => {
            window.open(`https://${shopDomain}/admin/themes`);
          }}
        />
      </View>
    );
  }
  if (statusInitialization === 'failure') {
    return (
      <View css={styles.container}>
        <Text css={{ textAlign: 'center', fontSize: '22px', marginBottom: '10px' }}>Something went wrong</Text>
        <Retry
          onClick={() => {
            init.request({ app });
          }}
        />
      </View>
    );
  }

  return (
    <View css={styles.container}>
      <ActivityIndicator size={50} />
    </View>
  );
};
