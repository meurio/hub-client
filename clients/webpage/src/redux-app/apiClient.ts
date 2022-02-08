import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export default axios.create({
  baseURL:
    publicRuntimeConfig.domainApiRest || 'https://api-rest.staging.bonde.org',
});
