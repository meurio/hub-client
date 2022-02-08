import React from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Stack,
  Tooltip,
  FormHelperText
} from "@chakra-ui/react";
import { FieldMetaState } from "react-final-form";
import { InfoIcon } from "../icons";

interface FormFieldProps {
  label?: string
  helpText?: string
  meta?: FieldMetaState<any>
}

const FormField: React.FC<FormFieldProps> = ({ children, helpText, label, meta }) => {
  return (
    <FormControl isInvalid={(meta?.error || meta?.submitError) && meta.touched} mb={4}>
      <Flex direction="row" justify="space-between">
        <Stack direction="row" spacing={2} align="center">
          {label && <FormLabel>{label}</FormLabel>}
          {helpText && (
            <Tooltip label={helpText}>
              <InfoIcon boxSize={4} /> 
            </Tooltip>
          )}
        </Stack>
        {(meta?.error || meta?.submitError) && meta.touched && (
          <FormHelperText color="red.200">{meta?.error || meta?.submitError}</FormHelperText>
        )}
      </Flex>
      {children}
    </FormControl>
  );
}

export default FormField;