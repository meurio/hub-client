import { gql } from 'bonde-core-tools';

export default gql`
  query CountTwilioCallsByWidget($widgetId: Int!) {
    allTwilioCalls(condition: {
      widgetId: $widgetId
    }) {
      totalCount
    }
  }
`
