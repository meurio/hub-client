import React, { useContext } from 'react';
import { Context as SessionContext, useQuery, gql } from 'bonde-core-tools';
import qs from 'query-string'
import { connect } from 'react-redux'
import MobSelectors from 'mobrender/redux/selectors'
import * as MobActions from 'mobrender/redux/action-creators'
import Page from './page';
import { useEffect } from 'react';

const FETCH_MOBILIZATIONS = gql`
  query ($community_id: Int!) {
    mobilizations(where: { community_id: { _eq: $community_id } }) {
      id
      name
      goal
      facebook_share_image
      custom_domain
      slug
      status
      created_at
      updated_at
      community {
        id
        name
        city
      }
    }
  }
`;

const MobilizationList = ({
  location,
  history,
  fetchMobilizations,
  select,
  toggleMenu,
  changeStatus,
  menuActiveIndex
}) => {
  const { community } = useContext(SessionContext);
  const { data, loading, error } = useQuery(FETCH_MOBILIZATIONS, { variables: { community_id: community.id } });

  useEffect(() => {
    if (data) fetchMobilizations(data.mobilizations);
  }, [data, fetchMobilizations])

  if (error) return <p>Failed fetch mobilizations</p>;

  const query = qs.parse(location.search);

  return loading
    ? <p>'Carregando mobilizações...'</p>
    : (
    <Page
      history={history}
      mobilizations={data.mobilizations}
      menuActiveIndex={menuActiveIndex}
      location={{ ...location, query }}
      select={select}
      toggleMenu={toggleMenu}
      changeStatus={changeStatus}
    />
  )
}

const mapStateToProps = (state, props) => {
  const selectors = MobSelectors(state, props)
  return {
    menuActiveIndex: selectors.getMobilizationMenuActive(),
    ...props
  }
}

const mapActionsToProps = (dispatch) => ({
  fetchMobilizations: (mobilizations) => dispatch({ type: 'FETCH_MOBILIZATIONS_SUCCESS', payload: mobilizations }),
  select: (...args) => dispatch(MobActions.selectMobilization(...args)),
  toggleMenu: (...args) => dispatch(MobActions.toggleMobilizationMenu(...args)),
  changeStatus: (mob) => {
    return dispatch(MobActions.asyncUpdateMobilization({
      id: mob.id,
      status: mob.status === 'active' ? 'archived' : 'active'
    }))
  }
})

export default connect(mapStateToProps, mapActionsToProps)(MobilizationList)
