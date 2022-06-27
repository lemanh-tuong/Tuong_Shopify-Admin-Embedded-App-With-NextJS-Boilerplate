import { TIDIO_REQUEST_FEATURES_MESSAGE } from 'src/env';
import { initializationSelector } from 'src/containers/selectors';
import { useTidioChat } from 'src/hooks/useTidioChat';
import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Text, useStyleSheet, useTheme, View, withStyles, WithStylesProps } from 'wiloke-react-core';
import * as css from './styles';

export interface MenuItemInterface {
  id: string;
  label: string;
  href?: string;
  exact?: boolean;
  isReactRouter: boolean;
  onClick?: () => void;
}

export interface NavigationProps {
  data: MenuItemInterface[];
}

const NavLinkWithStyles = withStyles(NavLink);

export const Navigation: FC<NavigationProps> = ({ data }) => {
  const { colors } = useTheme();
  const { styles } = useStyleSheet(colors);
  const { openWithEmail } = useTidioChat();
  const { email, shopDomain } = useSelector(initializationSelector);

  const linkProps: Pick<WithStylesProps, 'color' | 'colorHover' | 'css'> = {
    css: css.link,
    color: 'gray7',
    colorHover: 'gray7',
  };

  const renderLink = (item: MenuItemInterface): ReactNode => {
    const { isReactRouter, href, label, exact, onClick } = item;

    if (isReactRouter && href) {
      return (
        <NavLinkWithStyles {...linkProps} activeClassName={styles(css.active)} exact={exact} to={href}>
          {label}
        </NavLinkWithStyles>
      );
    }
    return (
      <Text {...linkProps} tagName="a" onClick={onClick} target="blank" href={href}>
        {label}
      </Text>
    );
  };

  const renderMenuItem = (item: MenuItemInterface): ReactNode => {
    const { id } = item;
    return (
      <View key={id}>
        <View className="Navigation-parent" css={css.parent}>
          {renderLink(item)}
        </View>
      </View>
    );
  };

  return (
    <View tagName="nav" className="Navigation-container" css={css.container}>
      {data.map(renderMenuItem)}
      <Text
        {...linkProps}
        onClick={() => {
          openWithEmail({
            email: email ?? '',
            shopName: shopDomain ?? '',
            message: TIDIO_REQUEST_FEATURES_MESSAGE,
          });
        }}
      >
        Request features to us
      </Text>
    </View>
  );
};
