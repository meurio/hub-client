import React from 'react';
import { shallow } from "enzyme";
import { Gadget, GadgetHeader } from "../src";

describe("Gadget", () => {
  
  it('renders without crashing', () => {
    const component = shallow(<Gadget />);
    expect(component).toBeTruthy();
  });

  it('renders Stack with styles', () => {
    const height = "800px";
    const component = shallow(<Gadget h={height} />);

    expect(component.find("Stack").prop("flex")).toBe(1);
    expect(component.find("Stack").prop("spacing")).toBe(4);
    expect(component.find("Stack").prop("h")).toBe(height);
    expect(component.find("Stack").prop("minH")).toBe(height);
  });

});

describe("GadgetHeader", () => {
  
  it('renders Heading', () => {
    const title = "My communities";
    const component = shallow(
      <GadgetHeader title={title} />
    );
  
    expect(component.find("Heading").prop("children")).toBe(title);
  });

  it("renders Heading with styles", () => {
    const component = shallow(<GadgetHeader title="My communities" />);
  
    expect(component.find("Heading").prop("as")).toBe("h5");
    expect(component.find("Heading").prop("size")).toBe("sm");
    expect(component.find("Heading").prop("color")).toBe("gray.400");
    expect(component.find("Heading").prop("textTransform")).toBe("uppercase");
  })
});