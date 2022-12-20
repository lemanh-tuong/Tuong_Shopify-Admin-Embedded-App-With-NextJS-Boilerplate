import { initializationSelector } from 'src/store/selectors';
import { TIDIO_REQUEST_FEATURES_MESSAGE } from 'src/env';
import { useTidioChat } from 'src/hooks/useTidioChat';
import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Text, useStyleSheet, useTheme, View } from 'wiloke-react-core';
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

export const Navigation: FC<NavigationProps> = ({ data }) => {
  const theme = useTheme();
  const { styles } = useStyleSheet(theme.colors);
  const { openWithEmail } = useTidioChat();
  const { email, shopDomain } = useSelector(initializationSelector);

  const renderLink = (item: MenuItemInterface): ReactNode => {
    const { isReactRouter, href, label, exact, onClick } = item;

    if (isReactRouter && href) {
      return (
        <NavLink
          className={({ isActive }) => {
            return isActive ? styles(css.link(theme), css.active(theme)) : styles(css.link(theme));
          }}
          end={exact}
          to={href}
        >
          {label}
        </NavLink>
      );
    }
    return (
      <Text css={css.link} tagName="a" onClick={onClick} target="blank" href={href}>
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
        css={[css.link(theme), css.chatButton(theme)]}
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
