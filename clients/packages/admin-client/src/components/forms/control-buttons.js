import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FormattedMessage, intlShape, injectIntl } from 'react-intl'
import classnames from 'classnames'

export class ControlButtons extends Component {
  render () {
    const { $formRedux: { floatButton, successMessage } } = this.context
    const { onCancel, submitting, submitted, dirty, formInline, valid, intl } = this.props
    return (
      <div className={classnames(
          'control-buttons',
          formInline ? 'inline-block ml1' : 'flex flex-wrap mt1'
      )}>
        {onCancel && (
          <div className='col-5 col mt1 mb2 px2'>
            <button
              className='btn h3 white p2 rounded bg-gray col-12'
              onClick={onCancel}
            >
              <FormattedMessage
                id='components--control-buttons.cancel'
                defaultMessage='Voltar'
              />
            </button>
          </div>
        )}
        <div className={classnames(
          onCancel ? 'col-7' : 'col-12',
          'col mt1 mb2 px2'
        )}>
          <input
            type='submit'
            className={classnames(
              'btn h3 white p2 rounded col-12',
              !valid ? 'bg-gray95' : 'bg-pagenta'
            )}
            disabled={!valid || submitting || !dirty}
            value={(submitting
              ? intl.formatMessage({
                id: 'components--control-buttons.input.value.saving',
                defaultMessage: 'Salvando...'
              })
              : floatButton || intl.formatMessage({
                id: 'components--control-buttons.input.value.default',
                defaultMessage: 'Continuar'
              })
            )}
          />
        </div>
        {submitted && !!successMessage && (
          <div className='success-message olive h4 px2 mt2'>
            {successMessage}
            <i className='fa fa-check-circle olive' />
          </div>
        )}
      </div>
    )
  }
}

ControlButtons.contextTypes = {
  $formRedux: PropTypes.object
}

ControlButtons.propTypes = {
  submitting: PropTypes.bool,
  submitted: PropTypes.bool.isRequired,
  dirty: PropTypes.bool,
  valid: PropTypes.bool,
  formInline: PropTypes.bool.isRequired,
  intl: intlShape.isRequired
}

ControlButtons.defaultProps = {
  formInline: false
}

export default injectIntl(ControlButtons)
