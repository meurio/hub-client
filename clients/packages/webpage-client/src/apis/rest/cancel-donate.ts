import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

interface CancelDonateArgs {
  id: number;
  token: string;
}

const cancelDonate = async ({ id, token }: CancelDonateArgs): Promise<any> => {
  const apiDomain = publicRuntimeConfig.domainApiRest || 'http://api-rest.bonde.devel';
  const uri = new URL(`/subscriptions/${id}?token=${token}`, apiDomain);

  const resp = await fetch(uri.href, {
    method: 'DELETE'
  });

  return await resp.json();
}

export default cancelDonate;