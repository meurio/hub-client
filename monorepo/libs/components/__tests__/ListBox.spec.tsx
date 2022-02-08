import React from "react";
import { shallow } from "enzyme";
import { EmptyIcon, ListBox, List, ListItem, Text } from "../src";

describe("ListBox", () => {
  const Item: React.FC = ({ item }: any) => <p className="item">{item}</p>

  it("renders without crashing", () => {
    const component = shallow(<ListBox itemRender={Item} />);

    expect(component).toBeTruthy();
  });

  it("renders icon and text when data is empty", () => {
    const emptyText = "Not found items."
    const component = shallow(
      <ListBox itemRender={Item} emptyText={emptyText} />
    );

    // Icon with styles
    expect(component.find(EmptyIcon).length).toBe(1);
    expect(component.find(EmptyIcon).prop("boxSize")).toBe(12);
    expect(component.find(EmptyIcon).prop("mb")).toBe(4);
    // Text
    expect(component.find(Text).prop("children")).toBe(emptyText);
  });

  it("renders List and ListItem for each data item", () => {
    const data = ["Apple", "Orange", "Pinneaple"];
    const component = shallow(
      <ListBox itemRender={Item} data={data} />
    );

    expect(component.find(List).length).toBe(1);
    expect(component.find(ListItem).length).toBe(data.length);
  });

  it("renders ListItem with styles", () => {
    const data = ["Apple", "Orange", "Pinneaple"];
    const component = shallow(
      <ListBox itemRender={Item} data={data} />
    );

    expect(component.find(ListItem).at(0).prop("p")).toBe(4);
  });

  it("renders itemRender for each data item", () => {
    const data = ["Apple", "Orange", "Pinneaple"];
    const component = shallow(
      <ListBox itemRender={Item} data={data} />
    );

    expect(component.find("p[className='item']").length).toBe(data.length);
    expect(component.find("p[className='item']").at(0).prop("children")).toBe(data[0]);
  });
});