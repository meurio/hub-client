import { gql } from 'react-apollo'

export const watchTwilioCallTransitions = gql`
  query watchTwilioCallTransitions($widgetId: Int! $from: String!) {
    watchTwilioCallTransitions(call: {
      widgetId: $widgetId
      from: $from
    }) {
      widgetId
      activistId
      twilioCallId
      twilioCallAccountSid
      twilioCallCallSid
      twilioCallFrom
      twilioCallTo
      twilioCallTransitionId
      twilioCallTransitionSequenceNumber
      twilioCallTransitionStatus
      twilioCallTransitionCallDuration
      twilioCallTransitionCreatedAt
      twilioCallTransitionUpdatedAt
    }
  }
`

export const countTwilioCallsByWidget = gql`
  query CountTwilioCallsByWidget($widgetId: Int!) {
    allTwilioCalls(condition: {
      widgetId: $widgetId
    }) {
      totalCount
    }
  }
`