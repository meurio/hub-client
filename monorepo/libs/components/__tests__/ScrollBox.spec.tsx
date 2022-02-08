import React from 'react';
import { shallow } from "enzyme";
import { ScrollBox } from "../src";

const scrollboxCSS = {
  "::-webkit-scrollbar": {
    width: "33px"
  },
  "::-webkit-scrollbar-thumb": {
    backgroundClip: "padding-box",
    backgroundColor: "rgba(74, 74, 74, 0.75)",
    borderWidth: "20px 15px",
    borderStyle: "solid",
    borderColor: "transparent",
    borderImage: "initial"
  }
}

describe("ScrollBox", () => {
  it('renders without crashing', () => {
    const component = shallow(<ScrollBox />);

    expect(component).toBeTruthy();
  });

  it('renders Box with styles', () => {
    const component = shallow(<ScrollBox />);

    expect(component.find("Box").prop("display")).toBe("flex");
    expect(component.find("Box").prop("flex")).toBe(1);
    expect(component.find("Box").prop("overflowY")).toBe("auto");
    expect(component.find("Box").prop("overflowX")).toBe("hidden");
  });

  it('renders Box with scroll styles', () => {
    const component = shallow(<ScrollBox />);

    expect(component.find("Box").prop("css")).toMatchObject(scrollboxCSS);
  });
});