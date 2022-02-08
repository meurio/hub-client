import React from 'react';
import { shallow } from "enzyme";
import { ImageBox } from "../src";

describe("ImageBox", () => {
  
  it('renders without crashing', () => {
    const component = shallow(
      <ImageBox title="My mobilization" author="By community" />
    );
    expect(component).toBeTruthy();
  });

  it('renders Box like a card styles', () => {
    const component = shallow(
      <ImageBox title="My mobilization" author="By community" />
    );
    const wrapperBox = component.find("Flex").at(0);

    expect(wrapperBox.prop("w")).toBe("auto");
    expect(wrapperBox.prop("boxShadow")).toBe("sm");
    expect(wrapperBox.prop("overflow")).toBe("hidden");
    expect(wrapperBox.prop("bg")).toBe("white");
  });

  it('renders Box with click', () => {
    const onClick = jest.fn();
    const component = shallow(
      <ImageBox
        title="My mobilization"
        author="By community"
        onClick={onClick}
      />
    );
    const wrapperBox = component.find("Flex").at(0);

    expect(wrapperBox.prop("as")).toBe("button");
    expect(wrapperBox.prop("onClick")).toBe(onClick);
  });

  it("renders Heading and Text with styles", () => {
    const title = "My mobilization";
    const author = "By community";
    const component = shallow(<ImageBox title={title} author={author} />);

    expect(component.find("Flex").at(1).prop("p")).toBe(4);

    expect(component.find("Heading").prop("children")).toBe(title);
    expect(component.find("Heading").prop("as")).toBe("h4");
    expect(component.find("Heading").prop("fontWeight")).toBe("extrabold");
    expect(component.find("Heading").prop("size")).toBe("md");

    expect(component.find("Text").prop("children")).toBe(author);
  });
});