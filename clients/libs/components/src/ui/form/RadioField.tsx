import React from "react";
import {
  FormControl,
  FormLabel,
  Flex,
  Stack,
  RadioGroup,
} from "@chakra-ui/react";
import { useField } from "react-final-form";
import Hint from "./Hint";

type RadioFieldProps = {
  children: any;
  label: string;
  name: string;
  direction?: "row" | "column";
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const RadioField = ({ children, label, name, direction }: RadioFieldProps) => {
  const { input, meta } = useField(name);

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
      <RadioGroup onChange={input.onChange} value={input.value}>
        <Stack direction={direction} spacing={4}>
          {children}
        </Stack>
      </RadioGroup>
    </FormControl>
  );
};

RadioField.defaultProps = {
  direction: "row",
};

export default RadioField;
