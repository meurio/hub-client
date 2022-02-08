import { connect } from 'react-redux'
import TellAFriend from './tell-a-friend'
import MobSelectors from 'mobrender/redux/selectors'

const mapStateToProps = state => {
  const { sourceRequest: { protocol, host } } = state
  const { custom_domain: customDomain } = MobSelectors(state).getMobilization()

  return {
    href: customDomain || `${protocol}://${host}`
  }
}

export { default as TellAFriend } from './tell-a-friend'
export default connect(mapStateToProps)(TellAFriend)
