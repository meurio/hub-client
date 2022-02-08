/* eslint-disable @typescript-eslint/no-explicit-any */
interface Config {
  environment?: any,
  domainAdmin?: any,
  domainAdminCanary?: any,
  domainPublic?: any,
  domainCrossStorage?: any,
  domainApiRest?: any,
  domainApiGraphql?: any,
  hasuraApiUrl?: any,
  awsBucket?: any,
  loginUrl?: any,
  domainRedes?: any,
  uploadsUrl?: any,
  apiGraphqlToken?: any
}

// console.log("NODE_ENV", process.env.NODE_ENV);

const config: Config = process.env.NODE_ENV !== "test"
  ? {
    // environment: import.meta.env.VITE_ENVIRONMENT,
    // domainAdmin: import.meta.env.VITE_DOMAIN_ADMIN,
    // domainAdminCanary: import.meta.env.VITE_DOMAIN_ADMIN_CANARY,
    // domainPublic: import.meta.env.VITE_DOMAIN_PUBLIC,
    // domainCrossStorage: import.meta.env.VITE_DOMAIN_CROSS_STORAGE,
    // domainApiRest: import.meta.env.VITE_DOMAIN_API_REST,
    // domainApiGraphql: import.meta.env.VITE_DOMAIN_API_GRAPHQL,
    // hasuraApiUrl: import.meta.env.VITE_HASURA_API_URL,
    // awsBucket: import.meta.env.VITE_AWS_BUCKET,
    // loginUrl: import.meta.env.VITE_LOGIN_URL,
    // domainRedes: import.meta.env.VITE_DOMAIN_REDES,
    // uploadsUrl: import.meta.env.VITE_UPLOADS_URL,
    // apiGraphqlToken: import.meta.env.VITE_API_GRAPHQL_TOKEN,
    environment: process.env.VITE_ENVIRONMENT,
    domainAdmin: process.env.VITE_DOMAIN_ADMIN,
    domainAdminCanary: process.env.VITE_DOMAIN_ADMIN_CANARY,
    domainPublic: process.env.VITE_DOMAIN_PUBLIC,
    domainCrossStorage: process.env.VITE_DOMAIN_CROSS_STORAGE,
    domainApiRest: process.env.VITE_DOMAIN_API_REST,
    domainApiGraphql: process.env.VITE_DOMAIN_API_GRAPHQL,
    hasuraApiUrl: process.env.VITE_HASURA_API_URL,
    awsBucket: process.env.VITE_AWS_BUCKET,
    loginUrl: process.env.VITE_LOGIN_URL,
    domainRedes: process.env.VITE_DOMAIN_REDES,
    uploadsUrl: process.env.VITE_UPLOADS_URL,
    apiGraphqlToken: process.env.VITE_API_GRAPHQL_TOKEN,

  } : {
    environment: "",
    domainAdmin: "",
    domainAdminCanary: "",
    domainPublic: "",
    domainCrossStorage: "",
    domainApiRest: "",
    domainApiGraphql: "",
    hasuraApiUrl: "",
    awsBucket: "",
    loginUrl: "",
    domainRedes: "",
    uploadsUrl: "",
    apiGraphqlToken: "",
  }

export default config;