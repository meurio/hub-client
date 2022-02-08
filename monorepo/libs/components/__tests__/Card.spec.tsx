import React from 'react';
import { shallow } from "enzyme";
import { Stack } from "@chakra-ui/react";
import { Card } from "../src";

describe("Card", () => {
  
  it('renders without crashing', () => {
    const component = shallow(
      <Card>273</Card>
    );
    expect(component).toBeTruthy();
  });

  it('renders with default styles', () => {
    const component = shallow(
      <Card>273</Card>
    );
    const stack = component.find(Stack);
    
    expect(stack.prop("as")).toBe("div");
    expect(stack.prop("bg")).toBe("white");
    expect(stack.prop("boxShadow")).toBe("sm");
    expect(stack.prop("direction")).toBe("row");
    expect(stack.prop("textAlign")).toBe("left");
    expect(stack.prop("w")).toBe("205px");
    expect(stack.prop("h")).toBe("90px");
    expect(stack.prop("rounded")).toBe(4);
    expect(stack.prop("alignItems")).toBe("center");
    expect(stack.prop("justifyContent")).toBe("center");
    expect(stack.prop("px")).toBe(4);
  });

  it('renders button when onClick', () => {
    const onClick = jest.fn();
    const component = shallow(
      <Card onClick={onClick}>273</Card>
    );
    const stack = component.find(Stack);

    expect(stack.prop("as")).toBe("button");
    expect(stack.prop("onClick")).toBe(onClick);
  });

  it('renders with smaller spacing when change direction', () => {
    const direction = "column";
    const component = shallow(
      <Card direction={direction}>273</Card>
    );
    const stack = component.find(Stack);

    expect(stack.prop("direction")).toBe(direction);
    expect(stack.prop("spacing")).toBe(2);
  });

  it('renders fullSize styles', () => {
    const component = shallow(
      <Card fullSize>273</Card>
    );
    const stack = component.find(Stack);

    expect(stack.prop("w")).toBe("auto");
    expect(stack.prop("h")).toBe("100%");
  });
});