import React from "react";
import { form } from 'bonde-components';
import SlateEditor from "../../../../components/SlateEditor"
const { useField } = form;

const RichInputField = ({ name }: any) => {
  const { input } = useField(name);

  return (
    <SlateEditor
      value={input.value}
      onChange={(value: any) => {
        input.onChange(value.toJS());
      }}
    />
  )
}

export default RichInputField;
