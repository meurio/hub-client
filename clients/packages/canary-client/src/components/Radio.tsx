import React, { createContext, useContext } from "react";
import { FormField, Hint, Label, useField } from "bonde-components";
import styled from "styled-components";

type RadioFieldProps = {
  children: any
  label: string
  name: string
  columns?: string
}

const RadioFieldContext = createContext({});

const Box = styled.div<{ columns?: any }>`
  display: grid;
  grid-template-columns: ${props => props.columns};
  margin: 15px 0 0 -15px;

  label {
    line-height: 1.5;
  }
`

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const RadioField = ({ children, label, name, columns }: RadioFieldProps) => {
  const { input, meta } = useField(name);

  return (
    <RadioFieldContext.Provider value={{ input }}>
      <FormField>
        <Label>{label}</Label>
        {meta.error && <Hint color='error'>{meta.error}</Hint>}
        <Box columns={columns}>
          {children}
        </Box>
      </FormField>
    </RadioFieldContext.Provider>
  );
}

RadioField.defaultProps = {
  direction: 'row'
}

const LabelStyled = styled(Label)`
  margin-left: 15px;
  align-items: center;

  input {
    margin-right: 8px;
  }
`

export const Radio = ({ children, value }: any) => {
  const { input }: any = useContext(RadioFieldContext);

  return (
    <LabelStyled>
      <input
        type="radio"
        checked={input.value === value}
        onChange={input.onChange}
        value={value}
      />
      {children}
    </LabelStyled>
  );
}

export default RadioField;