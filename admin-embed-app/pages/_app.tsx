import { I18nProvider } from 'src/translation';
import { Provider, useAppBridge } from '@shopify/app-bridge-react';
import { authenticatedFetch } from '@shopify/app-bridge-utils';
import { Redirect } from '@shopify/app-bridge/actions';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/dist/styles.css';
import translations from '@shopify/polaris/locales/en.json';
import 'antd/dist/antd.css';
import ApolloClient, { InMemoryCache, IntrospectionFragmentMatcher, IntrospectionResultData } from 'apollo-boost';
import App from 'next/app';
import { ApolloProvider } from 'react-apollo';
import adminSchema from './admin-schema.json';

const cache = new InMemoryCache({
  fragmentMatcher: new IntrospectionFragmentMatcher({
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

function MyProvider(props: any) {
  const app = useAppBridge();

  const client = new ApolloClient({
    cache,
    fetch: userLoggedInFetch(app) as any,
    fetchOptions: {
      credentials: 'include',
    },
  });

  const { Component } = props;

  return (
    <ApolloProvider client={client}>
      <Component {...props} />
    </ApolloProvider>
  );
}

class MyApp extends App {
  render() {
    const { Component, pageProps, host } = this.props as any;
    return (
      <AppProvider i18n={translations}>
        <Provider
          config={{
            // @ts-ignore
            apiKey: API_KEY,
            host: host,
            forceRedirect: true,
          }}
        >
          <I18nProvider>
            <MyProvider Component={Component} {...pageProps} />
          </I18nProvider>
        </Provider>
      </AppProvider>
    );
  }
}

// @ts-ignore
MyApp.getInitialProps = async ({ ctx }) => {
  return {
    host: ctx.query.host,
  };
};

export default MyApp;
