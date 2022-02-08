//
// @route /mobilizations
//
import { connect } from 'react-redux'
import qs from 'query-string'
import MobSelectors from 'mobrender/redux/selectors'
import * as MobActions from 'mobrender/redux/action-creators'

import Page from './page'

const mapStateToProps = (state, props) => {
  const selectors = MobSelectors(state, props)
  const { location: { search } } = props
  const query = qs.parse(search)
  return {
    mobilizations: selectors.getMobilizations(query),
    menuActiveIndex: selectors.getMobilizationMenuActive(),
    location: {
      ...props.location,
      query
    }
  }
}

const mapActionsToProps = (dispatch) => ({
  select: (...args) => dispatch(MobActions.selectMobilization(...args)),
  toggleMenu: (...args) => dispatch(MobActions.toggleMobilizationMenu(...args)),
  changeStatus: (mob) => {
    return dispatch(MobActions.asyncUpdateMobilization({
      id: mob.id,
      status: mob.status === 'active' ? 'archived' : 'active'
    }))
  }
})

export default connect(mapStateToProps, mapActionsToProps)(Page)
