import { XinRate } from 'src/containers/XinRate';
import { AccessToken } from 'src/containers/AccessToken';
import { FAQsPage } from 'src/pages/FAQsPage/FAQsPage';
import { initializationSelector } from 'src/store/selectors';
import { TIDIO_HELLO_MESSAGE } from 'src/env';
import { useTidioChat } from 'src/hooks/useTidioChat';
import { isBrowser } from 'src/utils/isBrowser';
import { SettingPage } from 'src/pages/SettingPage/SettingPage';
import { PricingPage } from 'src/pages/PricingPage';
import { InitializationPage } from 'src/pages/InitializationPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Page } from './types';

export const pages: Page[] = [
  {
    path: '/faqs',
    component: <FAQsPage />,
  },
  {
    path: '/pricing',
    component: <PricingPage />,
  },
  {
    path: '/settings/*',
    component: <SettingPage />,
  },
  {
    path: '/',
    component: <Navigate to="/settings" replace={true} />,
  },
];

export const AppRoutes = () => {
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
      <Routes>
        {pages.map(({ component, path }) => {
          return <Route key={path} element={component} path={path} />;
        })}
      </Routes>
    );
  };

  return (
    <>
      {_renderRoute()}
      {statusInitialization === 'success' && <XinRate />}
      {shopDomain && <AccessToken shopDomain={shopDomain} />}
    </>
  );
};
