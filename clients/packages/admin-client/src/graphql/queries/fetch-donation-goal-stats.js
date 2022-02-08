import { gql } from 'bonde-core-tools';

export default gql`
  query ($widgetId: Int!) {
    widgetDonationStats: get_widget_donation_stats(args: { widget_id: $widgetId }) {
      widget_id
      stats
    }
  }
`;
