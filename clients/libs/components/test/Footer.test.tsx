import * as React from "react";
import * as ReactDOM from "react-dom";
import { Footer } from "../src";

describe("it", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Footer />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
