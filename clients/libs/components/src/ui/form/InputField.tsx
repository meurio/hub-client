import React from "react";
import { useField } from "react-final-form";
import {
  Input,
  FormControl,
  FormLabel,
  Flex,
  Tooltip,
  Stack,
} from "@chakra-ui/react";
import { InfoIcon } from "../../icons";
import Hint from "./Hint";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const InputField = (props: any): React.ReactElement => {
  const {
    variant,
    label,
    name,
    placeholder,
    helpText,
    type,
    disabled,
    onBlur,
    ...config
  } = props;
  const { input, meta } = useField(name, config);

  return (
    <FormControl
      isInvalid={(meta.error || meta.submitError) && meta.touched}
      mb={4}
    >
      <Flex direction="row" justify="space-between">
        <Stack direction="row" spacing={2} align="center">
          <FormLabel>{label}</FormLabel>
          {helpText && (
            <Tooltip label={helpText}>
              <InfoIcon color="gray.300" boxSize={3} />
            </Tooltip>
          )}
        </Stack>
        {(meta.error || meta.submitError) && meta.touched && (
          <Hint color="error">{meta.error || meta.submitError}</Hint>
        )}
      </Flex>
      <Input
        variant={variant}
        value={input.value}
        onChange={input.onChange}
        placeholder={placeholder}
        type={type || input.type}
        disabled={disabled}
        onBlur={(e) => {
          onBlur && onBlur(e);
          input.onBlur(e);
        }}
      />
    </FormControl>
  );
};

export default InputField;
