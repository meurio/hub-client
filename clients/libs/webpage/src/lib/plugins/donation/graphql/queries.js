import { gql } from 'react-apollo'

export const fetchDonationGoalStats = gql`
  query fetchDonationGoalStats($widgetId: Int!) {
    data: getWidgetDonationStats(widgetId: $widgetId)
  }
`
