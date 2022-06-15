import * as React from "react";
import * as ReactDOM from "react-dom";
import { Label } from "../src";

describe("it", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Label />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
