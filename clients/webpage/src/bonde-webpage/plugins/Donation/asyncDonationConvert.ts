type Params = {
  donation_id: string | number;
  amount: string | number;
};

const donationTransactionConvert = (params: Params) => (
  _: any,
  __: any,
  { api }: any
) => {
  const endpoint = `/convert-donation`;
  return api.get(endpoint, { params });
};

export default donationTransactionConvert;
