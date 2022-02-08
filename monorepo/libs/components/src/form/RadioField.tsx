import React from "react";
import { Stack, RadioGroup } from "@chakra-ui/react";
import { useField } from "react-final-form";
import FormField from "./FormField";

interface RadioFieldProps extends Record<string, any> {
  children: any
  label?: string
  helpText?: string
  name: string
  direction?: "row" | "column"
}

const RadioField: React.FC<RadioFieldProps> = ({
  children,
  label,
  helpText,
  name,
  direction,
  ...config
}) => {
  const { input, meta } = useField(name, config);

  return (
    <FormField label={label} helpText={helpText} meta={meta}>
      <RadioGroup onChange={input.onChange} value={input.value}>
        <Stack direction={direction} spacing={4}>
          {children}
        </Stack>
      </RadioGroup>
    </FormField>
  );
}

RadioField.defaultProps = {
  direction: "row"
}

export default RadioField;