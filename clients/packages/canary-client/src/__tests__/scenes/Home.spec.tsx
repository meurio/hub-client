import React from "react";
import { mount } from "enzyme";
import Home from "../../scenes/Home";

it("render Home scene", () => {
  const scene = mount(<Home />);

  expect(scene).toBeTruthy();
});