import React from 'react';
import Select from 'react-select';
// TODO: Remove this
import PropTypes from 'prop-types'

class FormSelect extends React.Component {
  render() {
    const { options, maxLength } = this.props;
    // TODO: Remove this
    const {
      // $formRedux: { formInline, submitting, dirty },
      $formGroup: { value: values, onChange }
    } = this.context

    return (
      <Select
        isMulti
        // value={value}
        getValue={() => options.filter(({ value }) => value in values)}
        onChange={(items) => onChange(items?.map((item) => item.value))}
        options={values?.length === maxLength ? [] : options}
        noOptionsMessage={() => values?.length === maxLength
          ? "You've reached the max options value"
          : "No options available"
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