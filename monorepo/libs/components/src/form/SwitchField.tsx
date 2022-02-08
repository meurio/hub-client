import React from 'react';
import { useField } from 'react-final-form';
import { Stack, Text } from "@chakra-ui/react";
import FormField from './FormField';
import Switch from './Switch';

interface SwitchFieldProps extends Record<string, any>{
  name: string
  label?: string
  helpText?: string
  disabled?: boolean
  textOff: string
  textOn: string
}

const SwitchField: React.FC<SwitchFieldProps> = (props) => {
  const {
    label,
    name,
    disabled,
    textOff,
    textOn,
    helpText,
    children: _children,
    ...config
  } = props;
  const { input, meta } = useField(name, config);

  return (
    <FormField label={label} helpText={helpText} meta={meta}>
      <Stack direction="row" spacing={2} align="center">
        <Text color={disabled ? "gray.200" : "green.200"}>{input.value ? textOn : textOff}</Text>
        <Switch
          disabled={disabled}
          onClick={() => input.onChange(!input.value)}
          checked={input.value}
        />
      </Stack>
    </FormField>
  );
};

export default SwitchField;