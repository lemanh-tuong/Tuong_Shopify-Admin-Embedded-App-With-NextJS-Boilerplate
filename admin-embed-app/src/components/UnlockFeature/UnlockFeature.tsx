import { CONTACT_US_MESSAGE, ENABLE_CONTACT_US, TIDIO_UNLOCK_FEATURES_MESSAGE } from 'src/env';
import { Button } from 'src/components/Button';
import { initializationSelector, plansSelector } from 'src/containers/selectors';
import { useTidioChat } from 'src/hooks/useTidioChat';
import parse from 'html-react-parser';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { ActivityIndicator, View } from 'wiloke-react-core';
import * as styles from './styles';

interface UnlockFeatureProps {
  children: (isDisabled: boolean) => ReactNode;
}

export const UnlockFeature = ({ children }: UnlockFeatureProps) => {
  const { currentPlan, requestCurrentPlan } = useSelector(plansSelector);
  const { shopDomain, email } = useSelector(initializationSelector);
  const { openWithEmail } = useTidioChat();
  const history = useHistory();

  const isContactToUnlockEnable = currentPlan === 'Free' && ENABLE_CONTACT_US;
  const isPricingToUnlockEnable = currentPlan === 'Free' && !ENABLE_CONTACT_US;
  const isDisabled = isContactToUnlockEnable || isPricingToUnlockEnable;

  if (!ENABLE_CONTACT_US && requestCurrentPlan === 'loading') {
    return <ActivityIndicator />;
  }

  return (
    <View css={styles.container}>
      <View css={styles.content(isDisabled)}>{children(isDisabled)}</View>
      {isDisabled && (
        <Button
          block
          size="medium"
          css={{
            position: 'absolute',
            left: '0px',
            top: '50%',
            right: '0',
            transform: 'translateY(-50%)',
            textAlign: 'center',
            '& > span': { display: 'inline-block' },
          }}
          onClick={() => {
            if (isContactToUnlockEnable) {
              openWithEmail({
                shopName: shopDomain ?? '',
                email: email ?? '',
                message: TIDIO_UNLOCK_FEATURES_MESSAGE,
              });
            } else if (isPricingToUnlockEnable) {
              history.push('./pricing');
            }
          }}
        >
          {parse(CONTACT_US_MESSAGE)}
        </Button>
      )}
    </View>
  );
};
