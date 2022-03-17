//
// @route /mobilizations/:mobilization_id/customDomain
//
import { connect } from 'react-redux';

import MobSelectors from '../../../../../mobrender/redux/selectors';
import DNSControlSelectors from '../../../../../community/dns-control-selectors';
import Page from './page';

const mapStateToProps = (state, props) => ({
  mobilization: MobSelectors(state, props).getMobilization(),
  hostedZones: DNSControlSelectors(state).dnsHostedZones().getList(),
});

export default connect(mapStateToProps)(Page);
