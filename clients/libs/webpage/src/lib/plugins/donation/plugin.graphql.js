import { graphql } from 'react-apollo'
import * as graphqlQueries from './graphql/queries'
import DonationPluginConnected from './plugin.connected'

export default graphql(graphqlQueries.fetchDonationGoalStats, {
  name: 'donationGoalStats',
  options: props => ({
    variables: { widgetId: props.widget.id },
    fetchPolicy: 'network-only'
  })
})