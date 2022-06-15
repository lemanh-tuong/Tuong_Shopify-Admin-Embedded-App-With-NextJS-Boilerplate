import { TIDIO_HELLO_MESSAGE } from 'src/env';
import { XinRate } from 'src/components/XinRate/XinRate';
import { FAQsPage } from 'src/containers/FAQsPage/FAQsPage';
import { InitializationPage } from 'src/containers/InitializationPage';
import { PricingPage } from 'src/containers/PricingPage/PricingPage';
import { initializationSelector } from 'src/containers/selectors';
import { SettingPage } from 'src/containers/SettingPage/SettingPage';
import { useTidioChat } from 'src/hooks/useTidioChat';
import { isBrowser } from 'src/utils/isBrowser';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RoutePropagator } from './RoutePropagator';
import { Page } from './types';

export const pages: Page[] = [
  {
    path: '/faqs',
    exact: true,
    component: FAQsPage,
  },
  {
    path: '/pricing',
    exact: true,
    component: PricingPage,
  },
  {
    path: '/',
    component: SettingPage,
  },
];

export const Routes = () => {
  const { statusInitialization, shopDomain, email } = useSelector(initializationSelector);
  const { initTidioChat, openWithEmail, statusInitialization: statusInitializationTidio } = useTidioChat();

  useEffect(() => {
    if (isBrowser) {
      initTidioChat();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (statusInitializationTidio === 'success' && statusInitialization === 'success' && shopDomain && email) {
      openWithEmail({ email, shopName: shopDomain, message: TIDIO_HELLO_MESSAGE });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, shopDomain, statusInitialization, statusInitializationTidio]);

  const _renderRoute = () => {
    if (statusInitialization !== 'success') {
      return <InitializationPage />;
    }
    return (
      <Switch>
        {pages.map(({ component, path, exact }) => {
          return <Route key={path} component={component} exact={exact} path={path} />;
        })}
      </Switch>
    );
  };

  return (
    <BrowserRouter>
      <RoutePropagator />
      {_renderRoute()}
      {statusInitialization === 'success' && <XinRate />}
      {/* {shopDomain && <AccessToken shopDomain={shopDomain} />} */}
    </BrowserRouter>
  );
};
