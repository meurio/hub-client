/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
  publicRuntimeConfig: {
    domainApiRest: process.env.REACT_APP_DOMAIN_API_REST,
    domainApiGraphql: process.env.REACT_APP_DOMAIN_API_GRAPHQL,
    apiGraphqlSecret: process.env.REACT_APP_API_GRAPHQL_SECRET,
    domainApiGraphqlWs: process.env.REACT_APP_DOMAIN_API_GRAPHQL_WS,
    domainPublic: process.env.REACT_APP_DOMAIN_PUBLIC,
    pagarmeKey: process.env.REACT_APP_PAGARME_KEY
  }
});

