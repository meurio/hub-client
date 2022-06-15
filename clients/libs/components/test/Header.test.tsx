import * as React from "react";
import * as ReactDOM from "react-dom";
import { Header } from "../src";

describe("it", () => {
  it("Header.H1 renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Header.H1>Header</Header.H1>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Header.H2 renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Header.H2>Header</Header.H2>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Header.H3 renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Header.H3>Header</Header.H3>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Header.H4 renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Header.H4>Header</Header.H4>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Header.H5 renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Header.H5>Header</Header.H5>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Header.H6 renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Header.H6>Header</Header.H6>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
