import 'antd/dist/antd.css';
import { ApolloProvider } from 'src/providers/ApolloProvider';
import { PolarisProvider } from 'src/providers/PolarisProvider';
import { I18nProvider } from 'src/providers/I18nProvider';
import { AppBridgeProvider } from 'src/providers/AppBridgeProvider';
import { RouterProvider } from 'src/providers/RouterProvider';
import { ThemeNReduxProvider } from 'src/providers/ThemeNReduxProvider';
import App from 'next/app';

class MyApp extends App<{ host?: string }> {
  render() {
    const { Component, pageProps, host } = this.props;
    if (typeof window === 'undefined') {
      return <></>;
    }
    return (
      <PolarisProvider>
        <RouterProvider>
          <AppBridgeProvider host={host}>
            <ThemeNReduxProvider>
              <I18nProvider>
                <ApolloProvider Component={Component} {...pageProps} />
              </I18nProvider>
            </ThemeNReduxProvider>
          </AppBridgeProvider>
        </RouterProvider>
      </PolarisProvider>
    );
  }
}

MyApp.getInitialProps = async ({ ctx }) => {
  return {
    host: ctx.query.host,
    pageProps: undefined,
  };
};

export default MyApp;
