import PropTypes from 'prop-types'

export default {
  app: PropTypes.shape({
    signing: PropTypes.bool,
    signed: PropTypes.bool,
    token: PropTypes.string
  })
}
