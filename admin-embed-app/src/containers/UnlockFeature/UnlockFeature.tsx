import { CONTACT_US_TO_UNLOCK_FEATURE_DESCRIPTION, ENABLE_CONTACT_US_TO_UNLOCK_FEATURE, TIDIO_UNLOCK_FEATURES_MESSAGE } from 'src/env';
import { Button } from 'src/components/Button';
import { initializationSelector } from 'src/store/selectors';
import { useTidioChat } from 'src/hooks/useTidioChat';
import parse from 'html-react-parser';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ActivityIndicator, View } from 'wiloke-react-core';
import * as styles from './styles';

interface UnlockFeatureProps {
  children: (isDisabled: boolean) => ReactNode;
}

// TODO: I18n
export const UnlockFeature = ({ children }: UnlockFeatureProps) => {
  const { shopDomain, email } = useSelector(initializationSelector);
  const { openWithEmail } = useTidioChat();
  const navigate = useNavigate();

  const isContactToUnlockEnable = ENABLE_CONTACT_US_TO_UNLOCK_FEATURE; // Gói "Free" và có người trực => Chat để nhận được đề xuất từ đội support
  const isPricingToUnlockEnable = !ENABLE_CONTACT_US_TO_UNLOCK_FEATURE; // Gói "Free" và không có người trực => Nâng gói để sử dụng tính năng mới
  const isDisabled = isContactToUnlockEnable || isPricingToUnlockEnable;

  if (!ENABLE_CONTACT_US_TO_UNLOCK_FEATURE) {
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
              navigate('./pricing');
            }
          }}
        >
          {parse(CONTACT_US_TO_UNLOCK_FEATURE_DESCRIPTION)}
        </Button>
      )}
    </View>
  );
};
