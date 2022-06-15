import * as React from "react";
import * as ReactDOM from "react-dom";
import { Navigation } from "../src";

describe("it", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Navigation />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
