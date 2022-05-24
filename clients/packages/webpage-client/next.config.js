/* eslint-disable */

const withTM = require("next-transpile-modules")([
  "@slate-editor/alignment-plugin",
  "@slate-editor/color-plugin",
  "@slate-editor/embed-plugin",
  "@slate-editor/font-size-plugin",
  "@slate-editor/grid-plugin",
  "@slate-editor/image-plugin",
  "@slate-editor/link-plugin",
  "@slate-editor/list-plugin",
  "@slate-editor/components",
]); // pass the modules you would like to see transpiled

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withTM(
  withBundleAnalyzer({
    poweredByHeader: false,
    trailingSlash: true,
    basePath: "",
    // The starter code load resources from `public` folder with `router.basePath` in React components.
    // So, the source code is "basePath-ready".
    // You can remove `basePath` if you don't need it.
    reactStrictMode: true,
    publicRuntimeConfig: {
      domainImaginary: process.env.REACT_APP_DOMAIN_IMAGINARY,
      domainApiRest: process.env.REACT_APP_DOMAIN_API_REST,
      domainApiGraphql: process.env.REACT_APP_DOMAIN_API_GRAPHQL,
      apiGraphqlSecret: process.env.REACT_APP_API_GRAPHQL_SECRET,
      domainApiGraphqlWs: process.env.REACT_APP_DOMAIN_API_GRAPHQL_WS,
      domainPublic: process.env.REACT_APP_DOMAIN_PUBLIC,
      pagarmeKey: process.env.REACT_APP_PAGARME_KEY,
    },
  })
);
