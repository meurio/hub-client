import { gql } from 'bonde-core-tools';

export default gql`
  mutation updateTwilioConfiguration(
    $communityId: Int!
    $twilioAccountSid: String!
    $twilioAuthToken: String!
    $twilioNumber: String!
  ) {
    updateTwilioConfiguration(input: {
      config: {
        communityId: $communityId
        twilioAccountSid: $twilioAccountSid
        twilioAuthToken: $twilioAuthToken
        twilioNumber: $twilioNumber
      }
    }) {
      twilioConfiguration {
        id
        communityId
        twilioAccountSid
        twilioAuthToken
        twilioNumber
        createdAt
        updatedAt
      }
    }
  }
`
