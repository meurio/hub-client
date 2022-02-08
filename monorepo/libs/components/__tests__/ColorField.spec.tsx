import React from 'react';
import { shallow } from "enzyme";
import { SketchPicker } from 'react-color';
import { ColorField, FormField } from '../src';

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

describe('ColorField', () => {
  it('renders without crashing', () => {
    const component = shallow(<ColorField name="color" />);
    expect(component).toBeTruthy();
  });

  it('renders FormField', () => {
    const label = "Color";
    const helpText = "Choice your color";
    const component = shallow(<ColorField name="color" label={label} helpText={helpText} />);

    expect(component.find(FormField).prop("label")).toBe(label)
    expect(component.find(FormField).prop("helpText")).toBe(helpText)
    expect(component.find(FormField).prop("meta")).toBe(dummyUseField.meta);
  });

  it('renders SketchPicker', () => {
    const defaultValue = "#000";
    const component = shallow(<ColorField name="color" defaultValue={defaultValue} />);

    expect(component.find(SketchPicker).prop("color")).toBe(defaultValue);
    
    (component.find(SketchPicker).prop("onChangeComplete") as any)({ hex: "#fff" });
    expect(dummyUseField.input.onChange.mock.calls[0][0]).toBe("#fff");
  });
});
