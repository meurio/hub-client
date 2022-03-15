import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Context as SessionContext } from 'bonde-core-tools';
import { Loading } from '../../../components/await';
import SidebarAPI from '../../../components/navigation/sidebar';

// Actions and Selectors
import MobSelectors from '../../../mobrender/redux/selectors';
import * as MobActions from '../../../mobrender/redux/action-creators';
import * as CommunitySelectors from '../../../community/selectors';
import DNSControlSelectors from '../../../community/dns-control-selectors';
import * as DNSControlActions from '../../../community/action-creators/dns-control';

// SubRoutes
import MobilizationsContainer from '../mobilizations';
import AccountPage from '../account/edit';

const Wrapper = (props) => {
  const { currentUser: user, community }: any = useContext(SessionContext);
  const isLoading = !user && !community;
  const sidebarProps = {
    loading: false,
    user,
    community,
    mobilization: props.mobilization,
  };

  return (
    <SubRoute
      {...props}
      sidebarProps={sidebarProps}
      loaded={!isLoading}
      community={community}
      loading={isLoading}
    />
  );
};

interface SubRouteProperties {
  community: any;
  asyncFetchMobilizations: (id: number) => Promise<any>;
  asyncFetchHostedZones: () => Promise<any>;
  dnsControlSelectors: any;
  loaded: boolean;
  loading: boolean;
  sidebarProps: any;
}

class SubRoute extends React.Component<SubRouteProperties> {
  componentDidMount() {
    const promises: any[] = [];
    const {
      community,
      asyncFetchMobilizations,
      dnsControlSelectors: { dnsHostedZones },
      asyncFetchHostedZones,
    } = this.props;

    !!community && promises.push(asyncFetchMobilizations(community.id));
    !dnsHostedZones().isLoaded() && promises.push(asyncFetchHostedZones());
    return Promise.all(promises);
  }

  render() {
    const { community, loaded, loading, sidebarProps } = this.props;
    const isLoading = community && !loaded && !loading;

    return isLoading ? (
      <Loading />
    ) : (
      <SidebarAPI.Sidebar {...sidebarProps}>
        <Route path="/mobilizations" component={MobilizationsContainer} />
        <Route exact path="/account/edit" component={AccountPage} />
      </SidebarAPI.Sidebar>
    );
  }
}

const mapStateToProps = (state, props) => ({
  sidebarProps: SidebarAPI.getSidebarProps(state, props),
  community: CommunitySelectors.getCurrent(),
  mobilization: MobSelectors(state, props).getMobilization(),
  loading: MobSelectors(state, props).mobilizationsIsLoading(),
  loaded: MobSelectors(state, props).mobilizationsIsLoaded(),
  dnsControlSelectors: DNSControlSelectors(state),
});

const mapDispatchToProps = { ...MobActions, ...DNSControlActions };

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
