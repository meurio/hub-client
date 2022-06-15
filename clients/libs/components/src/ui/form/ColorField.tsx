import React from "react";
import { useField } from "react-final-form";
import { SketchPicker } from "react-color";
import { Flex, FormControl, FormLabel, Stack, Tooltip } from "@chakra-ui/react";
import { InfoIcon } from "../../icons";
import Hint from "./Hint";

// interface ColorFieldProps extends {
//   name: string
//   label?: string
//   helpText?: string
// }

const ColorField = (props: any): any => {
  const {
    // variant,
    label,
    name,
    // placeholder,
    helpText,
    // type,
    // disabled,
    // onBlur,
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
              <InfoIcon boxSize={4} />
            </Tooltip>
          )}
        </Stack>
        {(meta.error || meta.submitError) && meta.touched && (
          <Hint color="error">{meta.error || meta.submitError}</Hint>
        )}
      </Flex>
      <SketchPicker
        color={input.value}
        onChangeComplete={(color: any) => input.onChange(color.hex)}
      />
    </FormControl>
  );
};

export default ColorField;
