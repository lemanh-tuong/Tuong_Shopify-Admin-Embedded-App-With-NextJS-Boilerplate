import { Button } from 'src/components/Button';
import { AppRecommendations } from 'src/containers/AppRecommendations';
import { initializationSelector } from 'src/store/selectors';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Text, View } from 'wiloke-react-core';
import { Preview } from './Preview/Preview';
import * as styles from './styles';

export const MainContent = () => {
  const navigate = useNavigate();
  const { themeId, shopDomain } = useSelector(initializationSelector);
  const shopify_pagebuilder = `https://${shopDomain}/admin/themes/${themeId}/editor?context=apps`;

  return (
    <View css={styles.container}>
      <View backgroundColor="light" radius={10} css={{ padding: '16px', textAlign: 'center', marginTop: '16px' }}>
        <Text css={{ fontWeight: 500, marginBottom: '4px' }}>To complete app setup, add the app section to your store</Text>
        <Button
          onClick={() => {
            window.open(shopify_pagebuilder);
          }}
          css={{ marginRight: '8px' }}
        >
          Add app section to online store
        </Button>
        <Button
          onClick={() => {
            navigate('/faqs');
          }}
          backgroundColor="secondary"
        >
          Instruction?
        </Button>
      </View>
      <Preview />
      <AppRecommendations />
    </View>
  );
};
