import React from 'react';
import Select from 'react-select';
// TODO: Remove this
import PropTypes from 'prop-types'

const formSelectStyles = {
  dropdownIndicator: () => ({
    display: 'none'
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  control: (provided) => ({
    ...provided,
    border: 'none',
    'box-shadow': 'none',
    ':hover': {
      'border': 'none',
      'box-shadow': 'none'
    }
  }),
  option: (provided, { isFocused, isSelected }) => ({
    ...provided,
    backgroundColor: isFocused || isSelected ? '#eee' : 'none',
    ':active': {
      ...provided[':active'],
      backgroundColor: '#e6e6e6'
    }
  }),
  multiValue: (provided) => ({
    ...provided,
    borderRadius: '20px',
    padding: '2px 5px'
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    ':hover': {
      ...provided[':hover'],
      background: 'none',
      cursor: 'pointer',
    }
  })
}

class FormSelect extends React.Component {
  render() {
    const { options, maxLength, placeholder } = this.props;
    // TODO: Remove this
    const {
      // $formRedux: { formInline, submitting, dirty },
      $formGroup: { value: values, onChange }
    } = this.context

    return (
      <Select
        isMulti
        styles={formSelectStyles}
        placeholder={placeholder}
        getValue={() => options.filter(({ value }) => value in values)}
        onChange={(items) => onChange(items?.map((item) => item.value))}
        options={values?.length === maxLength ? [] : options}
        noOptionsMessage={() => values?.length === maxLength
          ? "Você atingiu o valor máximo de temas"
          : "Não há opções disponiveis"
        }
      />
    );
    
  }
}

FormSelect.contextTypes = {
  // $formRedux: PropTypes.shape({
  //   formInline: PropTypes.bool,
  //   submitting: PropTypes.bool,
  //   dirty: PropTypes.bool
  // }),
  $formGroup: PropTypes.object
}

FormSelect.propTypes = {
  options: PropTypes.any,
  maxLength: PropTypes.number
}

export default FormSelect;