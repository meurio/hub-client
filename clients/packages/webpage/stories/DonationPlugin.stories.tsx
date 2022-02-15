// import React from 'react';
// import { action } from '@storybook/addon-actions';
// import { createApolloFetch } from 'apollo-fetch';
// import DonationStats from '../src/plugins/Donation/components/DonationStats';
// import FetchDonationStats from '../src/plugins/Donation/FetchDonationStats';

// export const donationStats = () =>
//   <div style={{ width: '400px' }}>
//     <DonationStats
//       mainColor='rgb(5, 144, 70)'
//       goalDateLimit='30/04/2020'
//     />
//   </div>
// ;

// export const fetchDonationStats = () => {
//   const props = {
//     fetch: createApolloFetch({ uri: 'https://api-v2.staging.bonde.org/graphql' }),
//     widgetId: 8175,
//     mainColor: 'rgb(5, 144, 70)',
//     goalDateLimit: '30/04/2020',
//   };

//   return (
//     <FetchDonationStats {...props} />
//   );
// };

export default {
  title: 'DonationPlugin',
};
