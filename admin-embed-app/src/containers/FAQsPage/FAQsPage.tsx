import { APP_NAME, YOUTUBE_LINK } from 'src/env';
import { MainTemplate } from 'src/templates/MainTemplate';
import { View, Text } from 'wiloke-react-core';
import { Header } from '../Header/Header';
import * as styles from './styles';

const FAQs = () => {
  return (
    <View css={styles.container}>
      <View css={styles.box}>
        <Text css={styles.title}>How can I add the App section to my store?</Text>
        <View
          css={{
            position: 'relative',
            width: '60%',
            overflow: 'hidden',
            paddingTop: '35%',
          }}
        >
          <iframe
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            src={YOUTUBE_LINK}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
          />
        </View>
      </View>
      <View css={styles.box}>
        <Text css={styles.title}>How does {APP_NAME} work?</Text>
        <Text css={styles.description}>
          {APP_NAME} automatically converts currency at any place within your shop regardless of the format. Whether you use a third-party app like
          Mini Cart or fill content marketing with the product’s price, our {APP_NAME} app takes it in stride.
        </Text>
      </View>
      <View css={styles.box}>
        <Text css={styles.title}>How can I pick up a list of currencies myself?</Text>
        <Text css={styles.description}>
          <Text>Step 1: Click on Settings Tab</Text>
          <Text>Step 2: Choose Select Currencies mode under Select Currencies setting.</Text>
          <Text>Step 3: Finally, choose currencies that you want to displays</Text>
        </Text>
      </View>
      <View css={styles.box}>
        <Text css={styles.title}>How can I add {APP_NAME} Toolbar to a placement on my shop such as Bottom-Left, Top-Left, etc ... ?</Text>
        <Text css={styles.description}>
          <Text>Step 1: Still under Settings Tab, check on Add one more placement</Text>
          <Text>Step 2: The Placement setting is appeared after that → You can now select a placement with this setting.</Text>
        </Text>
      </View>
    </View>
  );
};

export const FAQsPage = () => {
  return <MainTemplate Header={Header} Content={FAQs} />;
};
