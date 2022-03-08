import { ApolloClient, InMemoryCache } from '@apollo/client';
import Cookies from 'js-cookie';

const createGraphQLClient = (uri: string) => {
  const headers: any = {
    'client-name': 'bonde-core-tools [web]',
    'client-version': '1.0.0'
  };

  const token = Cookies.get('session');
  if (token) {
    headers['authorization'] = `Bearer ${token}`;
  }

  return new ApolloClient({
    uri,
    cache: new InMemoryCache(),
    credentials: 'include',
    headers
  });
}

export default createGraphQLClient;