import { connect } from 'react-redux'
import FinishPostDonationComponent from './finish-post-donation'
import MobSelectors from 'mobrender/redux/selectors'

const mapStateToProps = state => {
  const { sourceRequest: { protocol, host } } = state
  const { custom_domain: customDomain } = MobSelectors(state).getMobilization()

  return {
    href: customDomain || `${protocol}://${host}`
  }
}

export default connect(mapStateToProps)(FinishPostDonationComponent)
