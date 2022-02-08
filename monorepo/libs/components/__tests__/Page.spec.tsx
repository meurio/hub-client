import React from 'react';
import { shallow } from "enzyme";
import { Page, PageNavbar, PageContent } from "../src";
import { Container } from "../src/theme/components";

describe("Page", () => {
  
  it('renders without crashing', () => {
    const component = shallow(<Page />);
    expect(component).toBeTruthy();
  });

  it('renders Flex with styles', () => {
    const component = shallow(<Page />);

    expect(component.find("Flex").prop("direction")).toBe("column");
    expect(component.find("Flex").prop("h")).toBe("100vh");
  });

});

describe("PageNavbar", () => {
  
  it('renders without crashing', () => {
    const component = shallow(<PageNavbar />);
    expect(component).toBeTruthy();
  });

  it('renders Flex with styles', () => {
    const component = shallow(<PageNavbar />);
    const wrapper = component.find("Flex").at(0);

    expect(wrapper.prop("direction")).toBe("column");
    expect(wrapper.prop("bg")).toBe("black");
    expect(wrapper.prop("px")).toBe(Container.baseStyle.px);
  });

  it('renders first-level of navbar', () => {
    const component = shallow(<PageNavbar />);
    const firstLevel = component.find("Flex").at(1);

    expect(firstLevel.prop("direction")).toBe("row");
    expect(firstLevel.prop("h")).toBe("54px");
    expect(firstLevel.prop("alignItems")).toBe("center");

    expect(firstLevel.find("BondeIcon").length).toBe(1);
  });

  it('renders second-level of navbar with header', () => {
    const header = "page title";
    const component = shallow(<PageNavbar header={header} />);
    const secondLevel = component.find("Flex").at(2);

    expect(secondLevel.prop("h")).toBe("42px");
    expect(secondLevel.prop("alignItems")).toBe("center");
    
    const heading = secondLevel.find("Heading")
    expect(heading.prop("as")).toBe("h1");
    expect(heading.prop("size")).toBe("xl");
    expect(heading.prop("color")).toBe("white");
    expect(heading.prop("children")).toBe(header);
  });

  it('renders third-level of navbar with navigation', () => {
    const header = "page title";
    const navigation = <p className="navigation">dummy</p>;
    const component = shallow(
      <PageNavbar header={header} navigation={navigation} />
    );
    const thirdLevel = component.find("HStack").at(0);

    // Wrap styles to nav
    expect(thirdLevel.prop("as")).toBe("nav");
    expect(thirdLevel.prop("h")).toBe("42px");
    expect(thirdLevel.prop("alignItems")).toBe("flex-end");
    // Renders navigation
    expect(thirdLevel.find("p[className='navigation']").length).toBe(1);
  });

  it('renders third-level of navbar with navigation inside darkmode', () => {
    const navigation = <p className="navigation">dummy</p>;
    const component = shallow(
      <PageNavbar navigation={navigation} />
    );
    const wrapper = component.find("DarkMode");
    expect(wrapper.find("p[className='navigation']").length).toBe(1);
  });
});

describe("PageContent", () => {

  it('renders without crashing', () => {
    const component = shallow(<PageContent />);
    expect(component).toBeTruthy();
  });

  it('renders Container with styles', () => {
    const component = shallow(<PageContent />);
    const wrapper = component.find("Container");

    expect(wrapper.prop("bg")).toBe("gray.50");
    expect(wrapper.prop("flex")).toBe(1);
  });

  it('renders Container with changed background', () => {
    const component = shallow(<PageContent bg="red" />);
    const wrapper = component.find("Container");

    expect(wrapper.prop("bg")).toBe("red");
    expect(wrapper.prop("flex")).toBe(1);
  });
});