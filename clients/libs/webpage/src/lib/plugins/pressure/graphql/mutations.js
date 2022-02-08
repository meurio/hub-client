import { gql } from 'react-apollo'

export const addTwilioCall = gql`
  mutation addTwilioCall(
    $widgetId: Int!
    $communityId: Int!
    $from: String!
    $to: String!
  ){
    addTwilioCall(input: {
      call: {
        widgetId: $widgetId
        communityId: $communityId
        from: $from
        to: $to
      }
    }) {
      twilioCall {
        id
        widgetId
        activistId
        twilioAccountSid
        twilioCallSid
        from
        to
        data
        createdAt
        updatedAt
        communityId
      }
    }
  }
`
