import React from 'react'
import PropTypes from 'prop-types'
// TODO: review this dependencies
import { FormattedMessage } from 'react-intl'


const styles = {
  select: {
    borderRadius: '2px',
    padding: '1rem',
    display: 'inline-block',
    height: 'inherit'
  },
  input: {
    borderRadius: '2px',
    padding: '1rem'
  },
  label: {
    fontSize: '.75rem',
    fontWeight: 600,
    marginBottom: '1rem'
  }
}

class Input extends React.Component {

  renderFieldKind () {
    const { name, onChange, field, onBlur } = this.props

    if (field.kind === 'dropdown') {
      return (
        <select
          name={name}
          className='select block border border-gray94'
          style={styles.select}
          onChange={onChange}
        >
          <FormattedMessage
            id='form-widget.components--input.field-dropdown.options.default'
            defaultMessage='Selecione...'
          >
            {(txt) => (<option value=''>{txt}</option>)}
          </FormattedMessage>
          {
            field.placeholder.split(',').map(function (v, index) {
              return <option key={`dropdown-option-${index}`}>{v}</option>
            })
          }
        </select>
      )
    } else {
      return (
        <input
          name={name}
          type={field.kind === 'email' ? 'email' : 'text'}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={field.placeholder}
          className='input block border border-gray94'
          style={styles.input}
        />
      )
    }
  }

  render () {
    const {
      field,
      mobilization: {
        body_font: bodyFont
      }
    } = this.props

    return (
      <div className='mb2' style={{ fontFamily: bodyFont }}>
        <label className='caps bold mb1 inline-block white' style={styles.label}>
          {field.label}{field.required === 'true' ? '*' : null}
        </label>
        {this.renderFieldKind()}
      </div>
    )
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  field: PropTypes.object.isRequired
}

export default Input