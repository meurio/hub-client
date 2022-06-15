import * as React from "react";
import * as ReactDOM from "react-dom";
import { Empty } from "../src";

describe("it", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Empty />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
