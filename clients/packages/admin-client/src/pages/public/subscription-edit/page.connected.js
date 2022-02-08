//
// @route /subscriptions/:id/edit
//
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import qs from 'query-string'
import {
  asyncSubscriptionDelete,
  asyncSubscriptionFetch,
  setModificationType
} from 'subscriptions/redux/action-creators'
import SubscriptionEditSelectors from 'subscriptions/redux/selectors/edit'
import AwaitSelectors from 'components/await/redux/selectors'
import Page from './page'

const mapStateToProps = (state, props) => {
  const selectors = SubscriptionEditSelectors(state)
  const { location: { search } } = props

  return {
    modificationType: selectors.getModificationType(),
    card: selectors.getCard(),
    query: qs.parse(search),
    data: selectors.getData(),
    loading: AwaitSelectors(state).getLoading()
  }
}

const mapDispatchToProps = {
  asyncSubscriptionDelete,
  setModificationType,
  asyncSubscriptionFetch
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Page))
