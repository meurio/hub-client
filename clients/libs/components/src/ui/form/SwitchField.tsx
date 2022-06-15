import React from "react";
import { useField } from "react-final-form";
import styled from "styled-components";

import FormField from "./FormField";
import Hint from "./Hint";
import Switch from "./Switch";
import Label from "./Label";

const SwitchField = (props: any) => {
  const { label, name, disabled, textOff, textOn, ...config } = props;
  const { input, meta } = useField(name, config);

  return (
    <FormField>
      {(meta.error || meta.submitError) && meta.touched && (
        <Hint color="error">{meta.error || meta.submitError}</Hint>
      )}
      <Container disabled={!input.value}>
        {label && <Label>{label}</Label>}

        <span className="text">{input.value ? textOn : textOff}</span>

        <Switch
          disabled={disabled}
          onClick={() => input.onChange(!input.value)}
          checked={input.value}
        />
      </Container>
    </FormField>
  );
};

type ContainerProps = {
  disabled: boolean;
};

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;

  .text {
    font-size: "13px";
    font-weight: 800;
    margin-right: 8px;
    color: ${({ disabled }) => (disabled ? "#858585" : "#50E3C2")};
  }
`;

export default SwitchField;
