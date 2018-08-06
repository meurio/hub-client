import React from 'react'
import { Checkbox, FormField, Input } from 'bonde-styleguide'
import { translate } from 'services/i18n'

class PasswordField extends React.Component {

  state = { showPassword: false }

  render () {
    const { showPassword } = this.state
    const { t, ...props } = this.props

    return (
      <React.Fragment>
        <FormField
          type={!showPassword ? 'password' : 'text'}
          placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;'
          inputComponent={Input}
          {...props}
        />
        {props.input.value && props.input.value.length > 0 && (
          <Checkbox
            checked={showPassword}
            onChange={() => this.setState({ showPassword: !showPassword })}
          >
            {t('links.showPassword')}
          </Checkbox>
        )}
      </React.Fragment>
    )
  }
}

export default translate('auth')(PasswordField)
