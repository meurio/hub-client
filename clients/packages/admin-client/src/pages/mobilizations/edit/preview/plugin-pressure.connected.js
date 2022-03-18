import { connect } from 'react-redux'
import { PressurePlugin } from 'bonde-webpage/lib/plugins/pressure'
import { fillWidget } from 'bonde-webpage/lib/plugins/pressure/redux/action-creators'

const mapDispatchToProps = { fillWidget }

export default connect(undefined, mapDispatchToProps)(PressurePlugin)