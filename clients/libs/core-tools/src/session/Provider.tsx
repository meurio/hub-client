import React, { createContext, useEffect, useState } from 'react';
import { ApolloProvider, gql } from '@apollo/client';
import Cookies from 'js-cookie';
import nextURI from './nextURI';
import type { User } from './types';
import createGraphQLClient from './createGraphQLClient';

const FETCH_SESSION_QUERY = gql`
  query Session {
    currentUser: get_current_user {
      id
      email
      avatar
      firstName: first_name
      lastName: last_name
      createdAt: created_at
      isAdmin: is_admin

      permissions: community_users {
        community_id
        user_id
        role
      }
    }

    communities {
      id
      name
      city
      description
      image
      created_at
      updated_at
      mailchimp_api_key
      mailchimp_list_id
      mailchimp_group_id
      fb_link
      twitter_link
      facebook_app_id
      email_template_from
      modules
      signature

      recipient {
        id
        pagarme_recipient_id
        transfer_day: recipient(path: "transfer_day")
        transfer_interval: recipient(path: "transfer_interval")
        transfer_enabled: recipient(path: "transfer_enabled")
        bank_account: recipient(path: "bank_account")
      }
    }
  }
`;



export const Context = createContext({});

export interface ProviderProperties {
  // Default is 'http'
  protocol?: string;
  // Ex.: bonde.devel
  appDomain: string;
  apiGraphQLUrl?: string;
  fetchData?: boolean;
  loadingComponent?: JSX.Element
}

const getObjectCookie = (key: string): any | undefined => {
  try {
    return JSON.parse(Cookies.get(key) as any);
  } catch (err) {
    // console.log('getObjectCookie err', err);
  }
}

const Provider: React.FC<ProviderProperties> = ({
  fetchData,
  protocol = 'http',
  appDomain,
  apiGraphQLUrl,
  // environment,
  children,
  loadingComponent
}) => {
  const [fetching, setFetching] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [communities, setCommunities] = useState([]);
  const [community, setCommunity] = useState(getObjectCookie('community'));
  // ApolloClient
  const client = createGraphQLClient(
    apiGraphQLUrl ? apiGraphQLUrl : `${protocol}://api-graphql.${appDomain}/v1/graphql`);

  const logout = () => {
    Cookies.remove('session', { path: '/', domain: `.${appDomain}` });
    Cookies.remove('community', { path: '/', domain: `.${appDomain}` });
    const uri = `${protocol}://accounts.${appDomain}/login`
    if (uri !== window.location.href) {
      window.location.href = nextURI(uri);
    }
  }

  const fetch = async () => {
    try {
      const { data } = await client.query({ query: FETCH_SESSION_QUERY });
      setCurrentUser(data.currentUser[0]);
      setCommunities(data.communities);
      setFetching(false);
    } catch (err) {
      if ((err as any).message === "field \"get_current_user\" not found in type: 'query_root'") {
        logout();
      } else if ((err as any).message === "Could not verify JWT: JWSError JWSInvalidSignature") {
        logout();
      } else {
        console.log('Provider fetch:', err);
        setCurrentUser(undefined);
        setCommunities([]);
        setFetching(false);
      }
    }
  }

  useEffect(() => {
    if (fetchData) fetch();
  }, [fetchData])

  const session = {
    fetching,
    token: Cookies.get('session'),
    currentUser: {
      ...currentUser,
      hasAdminPermission: () => {
        return currentUser?.isAdmin || (currentUser?.permissions.filter((perm) => perm.community_id === community?.id && perm.role === 1) || []).length > 0
      }
    },
    communities,
    community,
    updateSession: (key: string, value: any) => new Promise((resolve) => {
      if (key === 'community') {
        Cookies.set('community', JSON.stringify(value), { path: '/', domain: `.${appDomain}` });
        setCommunity(value);
      }
      return resolve(value);
    }),
    logout,
    apps: {
      'settings': `${protocol}://admin-canary.${appDomain}/community/settings`,
      'redes': `${protocol}://redes.${appDomain}`,
      'chatbot': `${protocol}://chatbot.${appDomain}`,
      'mobilization': `${protocol}://app.${appDomain}`
    }
  }

  let loading: JSX.Element = 'Carregando sessão' as any;
  if (loadingComponent) {
    loading = loadingComponent
  }

  return (
    <ApolloProvider client={client}>
      {fetchData && fetching ? loading : (
        <Context.Provider value={session}>
          {children}
        </Context.Provider>
      )}
    </ApolloProvider>
  );
}

export default Provider;