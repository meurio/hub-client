import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { DonationPlugin } from 'bonde-webpage/lib/plugins/donation'
import donationGraphql from 'bonde-webpage/lib/plugins/donation/plugin.graphql'
import { donationTransactionCreate } from 'bonde-webpage/lib/plugins/donation/redux/action-creators'

export default donationGraphql(connect(undefined, { donationTransactionCreate })(injectIntl(DonationPlugin)))