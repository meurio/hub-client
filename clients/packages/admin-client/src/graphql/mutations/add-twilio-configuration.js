import { gql } from 'bonde-core-tools';

export default gql`
  mutation addTwilioConfiguration(
    $communityId: Int!
    $twilioAccountSid: String!
    $twilioAuthToken: String!
    $twilioNumber: String!
  ) {
    addTwilioConfiguration(input: {
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
