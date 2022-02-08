import React from 'react';
import { shallow } from "enzyme";
import {
  TextareaField,
  // Textarea,
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

describe('TextareaField', () => {
  it('renders without crashing', () => {
    const component = shallow(<TextareaField name="description" />);
    expect(component).toBeTruthy();
  });

  it('renders FormField', () => {
    const label = "Color";
    const helpText = "Input your color";
    const component = shallow(<TextareaField name="color" label={label} helpText={helpText} />);

    expect(component.find(FormField).prop("label")).toBe(label)
    expect(component.find(FormField).prop("helpText")).toBe(helpText)
    expect(component.find(FormField).prop("meta")).toBe(dummyUseField.meta);
  });

  it('renders Input', () => {
    const defaultValue = "lorem ipsum dolor";
    const component = shallow(
      <TextareaField
        name="color"
        defaultValue={defaultValue}
      />
    );

    expect(component.find("Textarea").prop("value")).toBe(defaultValue);
    expect(component.find("Textarea").prop("onChange")).toBe(dummyUseField.input.onChange);
  });
});
