import React from 'react'
import PropTypes from 'prop-types'
import * as graphqlMutations from './graphql/mutations'
import * as graphqlQueries from './graphql/queries'
import PressurePlugin from './plugin'

class PressureGraphQL extends React.Component {

  constructor (props) {
    super(props)
    this.state = { observableQuery: undefined, callTransition: undefined }
  }

  handleTwilioCall (variables, watchQuery=false) {
    const { graphqlClient } = this.props
    const { phonePressureCount } = this.state

    this.setState({ phonePressureCount: phonePressureCount + 1 })

    return graphqlClient.mutate({
      mutation: graphqlMutations.addTwilioCall,
      variables
    }).then(() => {
      if (watchQuery && !this.state.observableQuery) {
        const observableQuery = graphqlClient.watchQuery({
          pollInterval: 2000,
          query: graphqlQueries.watchTwilioCallTransitions,
          variables: { widgetId: variables.widgetId, from: variables.from }
        })
        observableQuery.subscribe({
          next: ({ data: { watchTwilioCallTransitions: callTransition } }) => {
            this.setState({ callTransition })
          }
        })
        this.setState({ observableQuery })
      }
    })
  }

  render () {
    const { graphqlClient } = this.props
    return (
      <PressurePlugin
        {...this.props}
        callTransition={this.state.callTransition}
        twilioCall={this.handleTwilioCall.bind(this)}
        countTwilioCallsByWidget={(variables) => {
          return graphqlClient.query({
            query: graphqlQueries.countTwilioCallsByWidget,
            variables
          }).then(({ data: { allTwilioCalls: { totalCount: phonePressureCount } } }) => {
            return Promise.resolve({ phonePressureCount })
          })
        }}
      />
    )
  }
}

PressureGraphQL.propTypes = {
  graphqlClient: PropTypes.object.isRequired
}

export default PressureGraphQL