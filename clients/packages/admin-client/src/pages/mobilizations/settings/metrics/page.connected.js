//
// @route /mobilizations/:mobilization_id/metrics
//
import { connect } from 'react-redux';
import MobSelectors from '../../../../../mobrender/redux/selectors';
import Page from './page';

const mapStateToProps = (state, props) => ({
  mobilization: MobSelectors(state, props).getMobilization(),
});

export default connect(mapStateToProps)(Page);
