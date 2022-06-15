import * as React from "react";
import * as ReactDOM from "react-dom";
import { Form } from "../src";

describe("it", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Form />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
