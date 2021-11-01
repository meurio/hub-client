import classnames from 'classnames'
import PropTypes from 'prop-types'
import './browsable-list.scss'


const BrowsableList = ({ children, className, style }) => (
  <div className={classnames('browsable-list rounded', className)} style={style}>
    {children}
  </div>
)

BrowsableList.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  style: PropTypes.object
}

export default BrowsableList
