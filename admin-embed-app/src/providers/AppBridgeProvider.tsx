import { AppConfigV2 } from '@shopify/app-bridge';
import { Provider } from '@shopify/app-bridge-react';
import { FC, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const AppBridgeProvider: FC<{ host?: string }> = ({ children, host }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const history = useMemo(
    () => ({
      replace: (path: string) => {
        navigate(path, { replace: true });
      },
    }),
    [navigate],
  );

  const routerConfig = useMemo(() => ({ history, location }), [history, location]);

  const [appBridgeConfig] = useState<AppConfigV2>(() => {
    // @ts-ignore
    const host_ = new URLSearchParams(location.search).get('host') || host || window.__SHOPIFY_DEV_HOST;

    window.__SHOPIFY_DEV_HOST = host_;

    return {
      host: host_,
      // @ts-ignore
      apiKey: API_KEY, // Không dùng process.env để giấu API key
      forceRedirect: true,
    };
  });

  return (
    <Provider config={appBridgeConfig} router={routerConfig}>
      {children}
    </Provider>
  );
};
