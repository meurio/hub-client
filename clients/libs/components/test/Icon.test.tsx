import * as React from "react";
import * as ReactDOM from "react-dom";
import { Icon } from "../src";

describe("it", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Icon name="User" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
