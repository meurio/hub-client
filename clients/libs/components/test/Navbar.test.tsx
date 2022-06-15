import * as React from "react";
import * as ReactDOM from "react-dom";
import { Navbar } from "../src";

describe("it", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Navbar indexRoute="/" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
