import { I18nProvider } from 'src/translation';
import { Provider as AppBridgeProvider, ProviderProps as AppBridgeProviderProps, useAppBridge } from '@shopify/app-bridge-react';
import { authenticatedFetch } from '@shopify/app-bridge-utils';
import { Redirect } from '@shopify/app-bridge/actions';
import { AppProvider as PolarisProvider } from '@shopify/polaris';
import '@shopify/polaris/dist/styles.css';
import translations from '@shopify/polaris/locales/en.json';
import 'antd/dist/antd.css';
import ApolloClient, { InMemoryCache, IntrospectionFragmentMatcher, IntrospectionResultData } from 'apollo-boost';
import App from 'next/app';
import { ApolloProvider } from 'react-apollo';
import { FC, useMemo } from 'react';
import { BrowserRouter, useHistory, useLocation } from 'react-router-dom';
import adminSchema from './admin-schema.json';

const cache = new InMemoryCache({
  fragmentMatcher: new IntrospectionFragmentMatcher({
    // keyword: IntrospectionQuery shopify graphql
    introspectionQueryResultData: adminSchema.data as IntrospectionResultData,
  }),
});

function userLoggedInFetch(app: Parameters<typeof authenticatedFetch>[0]) {
  const fetchFunction = authenticatedFetch(app);

  return async (uri: Parameters<typeof fetchFunction>[0], options: Parameters<typeof fetchFunction>[1]) => {
    const response = await fetchFunction(uri, options);

    if (response.headers.get('X-Shopify-API-Request-Failure-Reauthorize') === '1') {
      const authUrlHeader = response.headers.get('X-Shopify-API-Request-Failure-Reauthorize-Url');

      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, authUrlHeader || `/auth`);
      return null;
    }

    return response;
  };
}

const ReactApolloProvider: FC = ({ children }) => {
  const app = useAppBridge();

  const client = new ApolloClient({
    cache,
    fetch: userLoggedInFetch(app) as any,
    fetchOptions: {
      credentials: 'include',
    },
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

const ShopifyAppBridgeProvider: FC<{ host?: string }> = ({ children, host }) => {
  const location = useLocation();
  const history = useHistory();

  const router: AppBridgeProviderProps['router'] = useMemo(() => {
    return {
      location,
      history: {
        replace: history.replace,
      },
    };
  }, [history, location]);

  const config: AppBridgeProviderProps['config'] = useMemo(() => {
    const host_ = new URLSearchParams(location.search).get('host') || host || window.__SHOPIFY_DEV_HOST;
    window.__SHOPIFY_DEV_HOST = host_;
    return {
      host: host_,
      forceRedirect: true,
      // @ts-ignore
      apiKey: API_KEY, // Dùng env để tránh lộ API key
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppBridgeProvider config={config} router={router}>
      {children}
    </AppBridgeProvider>
  );
};

class MyApp extends App {
  render() {
    const { Component, pageProps, host } = this.props as any;
    if (typeof window === 'undefined') {
      return <></>;
    }
    return (
      <BrowserRouter>
        <PolarisProvider i18n={translations}>
          <ShopifyAppBridgeProvider host={host}>
            <I18nProvider>
              <ReactApolloProvider Component={Component} {...pageProps}>
                <Component {...pageProps} />
              </ReactApolloProvider>
            </I18nProvider>
          </ShopifyAppBridgeProvider>
        </PolarisProvider>
      </BrowserRouter>
    );
  }
}

MyApp.getInitialProps = async ({ ctx }) => {
  return {
    host: ctx.query.host,
    pageProps: {},
  };
};

export default MyApp;
