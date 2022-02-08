//
// @route /mobilizations/:mobilization_id/widgets/:widget_id/pressure
//
import React from 'react'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import { useQuery, gql } from 'bonde-core-tools';

import { Warning } from 'components/notify'
import { Loading } from 'components/await'
import { Button } from 'ux/components'
import { adjustmentsForm, AdjustmentsSettingsForm } from 'mobrender/widgets/adjustments'
import MobSelectors from 'mobrender/redux/selectors'
import * as CommunitySelectors from 'community/selectors'
import * as MobActions from 'mobrender/redux/action-creators'
import * as Paths from 'paths'

const mapStateToProps = (state, props) => {
  const selectors = MobSelectors(state, props)

  return {
    mobilization: selectors.getMobilization(),
    widget: selectors.getWidget(),
    communityId: CommunitySelectors.getCurrentId(state)
  }
}

const mapDispatchToProps = {
  asyncWidgetUpdate: MobActions.asyncUpdateWidget
}

const SettingsForm = injectIntl(
  adjustmentsForm({ formName: 'pressureAdjustsForm' })(
    AdjustmentsSettingsForm
  )
)

const COUNT_TWILIO_CONFIGURATION = gql`
  query ($communityId: Int!) {
    configs: postgraphql_twilio_configurations_aggregate(where: {
      community_id: { _eq: $communityId }
    }) {
      aggregate {
        count
      }
    }
  }
`

const FormWithGraphql = (props) => {
  const { data, loading, error } = useQuery(COUNT_TWILIO_CONFIGURATION, {
    variables: { communityId: props.communityId },
    fetchPolicy: 'network-only'
  });

  if (error) {
    console.log("FormWithGraphql error: ", error);
    return <p>Failed!</p>;
  }

  const isConfigPreexists = data && data.configs.aggregate.count > 0;

  return (
    <div>
      {loading && (<Loading />)}
      {!isConfigPreexists && !loading && props.widget.kind === 'pressure-phone' && (
        <Warning
          title={(
            <FormattedMessage
              id='page--widgets-pressure--adjustmens.warning.title'
              defaultMessage='Falta pouco!'
            />
          )}
        >
          <FormattedMessage
            id='page--widgets-pressure--adjustmens.warning.content'
            defaultMessage={
              'Para liberar a Pressão por Telefone, o Bonde se juntou com o Twilio, uma plataforma ' +
              'online de comunicação. Pensa numa integração boa! Por isso, pra começar a causar por ' +
              'telefone é preciso configurar uma conta Twilio na sua comunidade.{linebreak}' +
              'Bora lá?'
            }
            values={{
              linebreak: <br />
            }}
          />
          <br />
          <Button btnStyles={{ margin: '15px 0 0' }} to={Paths.communityTwilio()}>
            <FormattedMessage
              id='page--widges-pressure--adjustments-warning.button'
              defaultMessage='Bora lá'
            />
          </Button>
        </Warning>
      )}
      <SettingsForm {...props} />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FormWithGraphql)
