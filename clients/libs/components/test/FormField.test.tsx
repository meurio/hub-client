import * as React from "react";
import * as ReactDOM from "react-dom";
import { FormField } from "../src";

describe("it", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<FormField />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
