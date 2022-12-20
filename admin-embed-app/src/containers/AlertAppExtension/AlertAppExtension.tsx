import { APP_NAME } from 'src/env';
import { Alert } from 'src/components/Alert';
import { Button } from 'src/components/Button';
import { useSelector } from 'react-redux';
import { View } from 'wiloke-react-core';
import { initializationSelector } from '../../store/selectors';

// TODO: I18n
export const AlertAppExtension = () => {
  const { appExtensionActived, themeId, shopDomain, statusInitialization } = useSelector(initializationSelector);
  const shopify_pagebuilder = `https://${shopDomain}/admin/themes/${themeId}/editor?context=apps`;

  if (statusInitialization === 'success' && !appExtensionActived) {
    return (
      <Alert
        type="danger"
        radius={6}
        message={
          <View>
            <View tagName="p">
              To complete setup, Enable "{APP_NAME}" to continue <br />"{APP_NAME}" is a embed extension help app that can access your theme to
              display the "{APP_NAME}" on your store
              <br />
              We strongly recommend enable to allow this app working properly.
              <br /> To activate and deactivate app embed blocks please click the{' '}
              <View tagName="a" css={{ textDecoration: 'underline' }} href={shopify_pagebuilder} target="blank">
                "Config now"
              </View>{' '}
              button below, and press Save from Theme settings
            </View>
            <Button colorHover="light" size="medium" radius={6} css={{ marginTop: '8px' }} href={shopify_pagebuilder} target="blank">
              Config now
            </Button>
          </View>
        }
        closable={false}
      />
    );
  }

  return null;
};
