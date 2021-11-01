import classnames from 'classnames'
import PropTypes from 'prop-types'


// Current module dependencies
import('./menu.scss')

const Menu = ({ active, children }) => (
  <div className={classnames('more-menu', { 'show': active })}>
    {children}
  </div>
)

Menu.contextTypes = {
  router: PropTypes.object.isRequired
}

Menu.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
}

Menu.defaultProps = {
  active: false
}

export default Menu
