import "colors";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const httpLink = createHttpLink({
  uri: publicRuntimeConfig.domainApiGraphql || "https://api-v2.staging.bonde.org/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      // 'x-hasura-admin-secret': publicRuntimeConfig.apiGraphqlSecret
      // authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
