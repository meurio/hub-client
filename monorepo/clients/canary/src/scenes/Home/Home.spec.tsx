import React from 'react';
import { shallow } from 'enzyme';
import { Gadget, GadgetHeader } from "@bonde/components";
import { HomeContent as Home } from '.';

describe("Home", () => {
  it('renders without crashing', () => {
    const scene = shallow(<Home />);
    expect(scene).toBeTruthy();
  });
  
  it('renders Gadget for communities', () => {
    const title = "Suas comunidades";
    const scene = shallow(<Home />);
    const gadget = scene.find(Gadget).at(0);
    const gadgetHeader = scene.find(GadgetHeader).at(0);

    expect(gadget).toBeTruthy();
    expect(gadgetHeader.prop("title")).toBe(title);
  });

  it('renders Gadget for mobilizations', () => {
    const title= "Últimas atualizações";
    const scene = shallow(<Home />);
    const gadget = scene.find(Gadget).at(1);
    const gadgetHeader = scene.find(GadgetHeader).at(1);

    expect(gadget).toBeTruthy();
    expect(gadgetHeader.prop("title")).toBe(title);
  });
});

