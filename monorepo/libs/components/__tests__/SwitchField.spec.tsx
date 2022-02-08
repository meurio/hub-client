import React from 'react';
import { shallow } from "enzyme";
import {
  SwitchField,
  FormField
} from '../src';

const dummyUseField = {
  input: { onChange: jest.fn(), value: "" },
  meta: { error: undefined, touched: false }
}

jest.mock('react-final-form', () => ({  
  useField: (_name: string, _config: any) => ({
    input: { ...dummyUseField.input, value: _config?.defaultValue || false },
    meta: dummyUseField.meta
  })
}));

describe('SwitchField', () => {
  it('renders without crashing', () => {
    const component = shallow(<SwitchField name="enable" textOn="Enabled" textOff="Disabled" />);
    expect(component).toBeTruthy();
  });

  it('renders FormField', () => {
    const label = "Color";
    const helpText = "Input your color";
    const component = shallow(
      <SwitchField
        name="enable"
        textOn="Enabled"
        textOff="Disabled"
        label={label}
        helpText={helpText}
      />
    );

    expect(component.find(FormField).prop("label")).toBe(label)
    expect(component.find(FormField).prop("helpText")).toBe(helpText)
    expect(component.find(FormField).prop("meta")).toBe(dummyUseField.meta);
  });

  it('renders Switch', () => {
    const component = shallow(
      <SwitchField
        name="enable"
        textOn="Enabled"
        textOff="Disabled"
      />
    );

    expect(component.find("Switch").length).toBe(1);
  });
});
