import React from 'react';
import { useField } from 'react-final-form';
import FormField from './FormField';
import RoundSelect from './RoundSelect';

type Props = {
  name: string;
  options: Array<{
    value: string | number;
    label: string | number;
  }>;
  label?: string;
  helpText?: string;
  placeholder?: string;
  disabled?: boolean;
  menuPortalTarget?: HTMLBodyElement | null;
  isClearable?: boolean;
  onChange?: (event: any) => void;
  maxMenuHeight?: number;
  menuPlacement?: 'auto' | 'top' | 'bottom';
};

const RoundSelectField: React.FC<Props> = ({
  label,
  helpText,
  name,
  placeholder,
  disabled,
  options,
  menuPortalTarget,
  isClearable,
  onChange,
  maxMenuHeight = 300,
  menuPlacement = 'bottom',
  ...config
}: Props) => {
  const { input, meta } = useField(name, config);
  return (
    <FormField label={label} helpText={helpText} meta={meta}>
      <RoundSelect
        {...input}
        options={options}
        placeholder={placeholder}
        invalid={(meta.error || meta.submitError) && meta.touched}
        disabled={disabled}
        menuPortalTarget={menuPortalTarget}
        isClearable={isClearable}
        maxMenuHeight={maxMenuHeight}
        menuPlacement={menuPlacement}
        onChange={e => {
          onChange && onChange(e);
          input.onChange(e);
        }}
      />
    </FormField>
  );
};

export default RoundSelectField;
