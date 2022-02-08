import * as CommunitySelectors from 'community/selectors'
import AuthSelectors from 'account/redux/selectors'
import MobSelectors from 'mobrender/redux/selectors'

export default (state, ownProps) => {
  const mob = MobSelectors(state, ownProps)
  const auth = AuthSelectors(state, ownProps)
  return {
    loading: mob.mobilizationsIsLoading(),
    user: auth.getUser(),
    mobilization: mob.getMobilization(),
    community: CommunitySelectors.getCurrent(state)
  }
}
