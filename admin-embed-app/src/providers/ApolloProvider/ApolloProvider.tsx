import { useAppBridge } from '@shopify/app-bridge-react';
import { authenticatedFetch } from '@shopify/app-bridge-utils';
import { Redirect } from '@shopify/app-bridge/actions';
import { ApolloClient, ApolloProvider as ReactApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';

function userLoggedInFetch(app: Parameters<typeof authenticatedFetch>[0]) {
  const fetchFunction = authenticatedFetch(app);

  return async (uri: Parameters<typeof fetchFunction>[0], options: Parameters<typeof fetchFunction>[1]) => {
    const response = await fetchFunction(uri, options);

    if (response.headers.get('X-Shopify-API-Request-Failure-Reauthorize') === '1') {
      const authUrlHeader = response.headers.get('X-Shopify-API-Request-Failure-Reauthorize-Url');

      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, authUrlHeader || `/auth`);
      return response;
    }

    return response;
  };
}

export const ApolloProvider = (props: any) => {
  const app = useAppBridge();

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({
      credentials: 'include',
      headers: {
        'Content-Type': 'application/graphql',
      },
      fetch: userLoggedInFetch(app),
    }),
  });

  const { Component } = props;

  return (
    <ReactApolloProvider client={client}>
      <Component {...props} />
    </ReactApolloProvider>
  );
};
