import React from 'react';
import { ControlLabel } from '../../components/forms';
import Select from 'react-select';

const formSelectStyles = {
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
    backgroundColor: isFocused ? '#eee' : isSelected ? '#e6e6e6' : 'none',
    ':active': {
      ...provided[':active'],
      backgroundColor: 'none'
    },
    color: '#000'
  })
}

interface Props {
  value?: any;
  initialValue?: any;
  disabled?: boolean;
  onChange: any;
  subthemes: any[];
  subthemesField: {
    value?: number[]
  }
}

class MainThemeField extends React.Component<Props> {

  componentDidUpdate(prevProps) {
    if (prevProps.subthemesField.value !== this.props.subthemesField.value) {
      const filtered = this.getThemes();
      if (filtered.length === 1) {
        this.props.onChange(filtered[0].id)
      }
    }
  }

  getThemes() {
    // Seleciona temas relacionados
    const themes = (this.props.subthemesField?.value || []).map((id) => {
      return this.props.subthemes.filter((subtheme) => subtheme.id === id)[0].theme;
    });

    // Remove duplicados
    const filtered = themes.filter(
      (este, i) => themes.findIndex(({ id }) => id === este.id) === i);

    return filtered;
  }

  render() {
    const {
      subthemesField,
      // initialValue,
      value,
      disabled,
      onChange
    } = this.props;

    if (subthemesField.value && subthemesField.value.length > 0) {
      const filtered = this.getThemes();

      if (filtered.length > 1) {
        return (
          <div className='form-group'>
            <ControlLabel>Tema principal</ControlLabel>
            <Select
              isDisabled={disabled}
              styles={formSelectStyles}
              placeholder="Escolha o tema principal"
              defaultValue={filtered.filter(({ id }) => value === id)[0]}
              getValue={() => filtered.filter(({ id }) => value === id)[0]}
              onChange={(item) => onChange(item.value)}
              options={filtered.map(({ id, label }) => ({ value: id, label }))}
            />
          </div>
        );
      }
    }

    return null;
  }
}

export default MainThemeField;