import React from 'react';
import { shallow } from "enzyme";
// import { SketchPicker } from 'react-color';
import { FormField, FormLabel, FormHelperText, Tooltip } from '../src';

describe('FormField', () => {
  it('renders without crashing', () => {
    const component = shallow(<FormField />);
    expect(component).toBeTruthy();
  });

  it('renders FormLabel', () => {
    const label = "Choice color";
    const component = shallow(<FormField label={label} />);

    expect(component.find(FormLabel).prop("children")).toBe(label);
  });

  it('renders Tooltip with helpText', () => {
    const helpText = "Choice color";
    const component = shallow(<FormField helpText={helpText} />);

    expect(component.find(Tooltip).prop("label")).toBe(helpText);
  });

  it('renders FormHelperText error', () => {
    const meta = {
      error: "invalid input",
      touched: true
    }
    const component = shallow(<FormField meta={meta} />);

    expect(component.find(FormHelperText).prop("color")).toBe("red.200");
    expect(component.find(FormHelperText).prop("children")).toBe(meta.error);
  });
});
