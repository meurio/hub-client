import React from "react";
import { useField } from "react-final-form";
import { Select, FormControl, FormLabel, Flex } from "@chakra-ui/react";
import Hint from "./Hint";

type Props = {
  children: any;
  label: string;
  name: string;
  disabled?: boolean;
  validate?: any;
};

const SelectField = (props: Props): React.ReactElement => {
  const { label, name, disabled, children, ...config } = props;
  const { input, meta } = useField(name, config);

  return (
    <FormControl
      isInvalid={(meta.error || meta.submitError) && meta.touched}
      mb={4}
    >
      <Flex direction="row" justify="space-between">
        <FormLabel>{label}</FormLabel>
        {(meta.error || meta.submitError) && meta.touched && (
          <Hint color="error">{meta.error || meta.submitError}</Hint>
        )}
      </Flex>
      <Select disabled={disabled} {...input}>
        {children}
      </Select>
    </FormControl>
  );
};

export default SelectField;
