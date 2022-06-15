import React from "react";
import { useField } from "react-final-form";
import FormField from "./FormField";
import Hint from "./Hint";
import Textarea from "./Textarea";
import Label from "./Label";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const TextareaField = (props: any) => {
  const { label, name, placeholder, disabled, ...config } = props;
  const { input, meta } = useField(name, config);

  return (
    <FormField>
      <Label>{label}</Label>
      {(meta.error || meta.submitError) && meta.touched && (
        <Hint color="error">{meta.error || meta.submitError}</Hint>
      )}
      <div style={{ display: "flex", paddingTop: "8px" }}>
        <Textarea
          placeholder={placeholder}
          invalid={(meta.error || meta.submitError) && meta.touched}
          disabled={disabled}
          {...input}
        />
      </div>
    </FormField>
  );
};

export default TextareaField;
