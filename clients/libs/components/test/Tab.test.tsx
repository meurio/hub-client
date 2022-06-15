import * as React from "react";
import * as ReactDOM from "react-dom";
import { Tab } from "../src";

describe("it", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Tab />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
