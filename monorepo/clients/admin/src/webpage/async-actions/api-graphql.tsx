import { GraphQLClient } from 'graphql-request';
import config from "../../config";

const API_URL: any = config.domainApiGraphql || "";

const API_TOKEN: any = config.apiGraphqlToken || "";

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export default new GraphQLClient(API_URL, {
  headers: {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    authorization: `Bearer ${API_TOKEN}`
  }
});