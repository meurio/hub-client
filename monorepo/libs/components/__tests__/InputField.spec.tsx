import React from 'react';
import { shallow } from "enzyme";
import {
  InputField,
  Input,
  FormField
} from '../src';

const dummyUseField = {
  input: { onChange: jest.fn(), value: "" },
  meta: { error: undefined, touched: false }
}

jest.mock('react-final-form', () => ({  
  useField: (_name: string, _config: any) => ({
    input: { ...dummyUseField.input, value: _config?.defaultValue || "" },
    meta: dummyUseField.meta
  })
}));

describe('InputField', () => {
  it('renders without crashing', () => {
    const component = shallow(<InputField name="color" />);
    expect(component).toBeTruthy();
  });

  it('renders FormField', () => {
    const label = "Color";
    const helpText = "Input your color";
    const component = shallow(<InputField name="color" label={label} helpText={helpText} />);

    expect(component.find(FormField).prop("label")).toBe(label)
    expect(component.find(FormField).prop("helpText")).toBe(helpText)
    expect(component.find(FormField).prop("meta")).toBe(dummyUseField.meta);
  });

  it('renders Input', () => {
    const defaultValue = "#000";
    const variant = "solid";
    const placeholder = "Input your color here";
    const disabled = false;
    const component = shallow(
      <InputField
        name="color"
        variant={variant}
        disabled={disabled}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    );

    expect(component.find(Input).prop("value")).toBe(defaultValue);
    expect(component.find(Input).prop("variant")).toBe(variant);
    expect(component.find(Input).prop("placeholder")).toBe(placeholder);
    expect(component.find(Input).prop("disabled")).toBe(disabled);
    expect(component.find(Input).prop("onChange")).toBe(dummyUseField.input.onChange);
  });
});
