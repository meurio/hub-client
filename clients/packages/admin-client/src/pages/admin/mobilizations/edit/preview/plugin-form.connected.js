import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { FormPlugin } from 'bonde-webpage/lib/plugins/form'
import { asyncFormEntryCreate } from 'bonde-webpage/lib/redux/action-creators'

const mapDispatchToProps = { asyncFormEntryCreate }

export default connect(undefined, mapDispatchToProps)(injectIntl(FormPlugin))