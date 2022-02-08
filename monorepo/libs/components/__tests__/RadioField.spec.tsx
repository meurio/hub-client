import React from 'react';
import { shallow } from "enzyme";
import {
  RadioField,
  RadioGroup,
  Radio,
  FormField,
  Stack
} from '../src';

const dummyUseField = {
  input: { onChange: jest.fn(), value: "Choice 1" },
  meta: { error: undefined, touched: false }
}

jest.mock('react-final-form', () => ({  
  useField: (_name: string, _config: any) => ({
    input: { ...dummyUseField.input, value: _config?.defaultValue || "" },
    meta: dummyUseField.meta
  })
}));

describe('RadioField', () => {
  it('renders without crashing', () => {
    const component = shallow(
      <RadioField name="color">
        <Radio>Choice 1</Radio>
      </RadioField>
    );
    expect(component).toBeTruthy();
  });

  it('renders FormField', () => {
    const label = "Color";
    const helpText = "Input your color";
    const component = shallow(
      <RadioField name="color" label={label} helpText={helpText}>
        <Radio>Choice 1</Radio>
      </RadioField>
    );

    expect(component.find(FormField).prop("label")).toBe(label)
    expect(component.find(FormField).prop("helpText")).toBe(helpText)
    expect(component.find(FormField).prop("meta")).toBe(dummyUseField.meta);
  });

  it('renders RadioGroup', () => {
    const defaultValue = "Choice 1";
    const label = "Input your color here";
    const component = shallow(
      <RadioField name="color" label={label} defaultValue={defaultValue}>
        <Radio>Choice 1</Radio>
        <Radio>Choice 2</Radio>
      </RadioField>
    );

    expect(component.find(RadioGroup).prop("value")).toBe(defaultValue);
    expect(component.find(RadioGroup).prop("onChange")).toBe(dummyUseField.input.onChange);
  });

  it('change direction render Radio', () => {
    const label = "Input your color here";
    const direction = "column";
    const component = shallow(
      <RadioField name="color" label={label} direction={direction}>
        <Radio>Choice 1</Radio>
        <Radio>Choice 2</Radio>
      </RadioField>
    );

    expect(component.find(Stack).prop("direction")).toBe(direction);
    expect(component.find(Stack).prop("spacing")).toBe(4);
  });
});
