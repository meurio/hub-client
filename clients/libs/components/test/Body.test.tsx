import * as React from "react";
import * as ReactDOM from "react-dom";
import { Body } from "../src";

describe("it", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Body>Lorem ipsum</Body>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
