import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

//
// Action to update the user subscription data and recharge it.
// For more informations about the endpoint, @see https://github.com/nossas/bonde-server/pull/185
// @param values Object({
//   id: Integer|String (required)
//   token: String (required)
//   card_hash: String (required if `process_at` is not defined)
//   process_at: String (required if `card_hash` is not defined)
// })
//

interface RechargeArgs {
  id: number;
  token: string;
  card_hash?: string
  process_at?: string
}

const recharge = async ({ id, token, card_hash, process_at }: RechargeArgs): Promise<any> => {
  const apiDomain = publicRuntimeConfig.domainApiRest || 'http://api-rest.bonde.devel';
  const uri = new URL(`/subscriptions/${id}/recharge`, apiDomain);

  const resp = await fetch(uri.href, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ id, token, card_hash, process_at })
  });

  return await resp.json();
}

export default recharge;