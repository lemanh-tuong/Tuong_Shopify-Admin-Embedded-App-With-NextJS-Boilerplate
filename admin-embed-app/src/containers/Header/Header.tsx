import { Button } from 'src/components/Button';
import { Navigation, NavigationProps } from 'src/components/Navigation';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { View } from 'wiloke-react-core';
import { initializationSelector } from '../selectors';
import * as styles from './styles';

const navItems: NavigationProps['data'] = [
  {
    label: 'Home',
    href: '/',
    id: v4(),
    isReactRouter: true,
    exact: true,
  },
  {
    label: 'Advanced',
    href: '/advanced',
    id: v4(),
    isReactRouter: true,
    exact: true,
  },
  {
    label: 'FAQs',
    href: '/faqs',
    id: v4(),
    isReactRouter: true,
    exact: true,
  },
  {
    label: 'Pricing',
    href: '/pricing',
    id: v4(),
    isReactRouter: true,
    exact: true,
  },
];

export const Header = () => {
  const { shopDomain } = useSelector(initializationSelector);

  return (
    <View css={styles.container}>
      <View css={styles.left}>
        <Navigation data={navItems} />
      </View>
      <View css={styles.right}>
        <Button
          size="small"
          onClick={() => {
            window.open(`https://${shopDomain}`);
          }}
          backgroundColor="gray2"
          color="gray8"
          css={{ marginRight: '10px' }}
        >
          Preview
        </Button>
      </View>
    </View>
  );
};
