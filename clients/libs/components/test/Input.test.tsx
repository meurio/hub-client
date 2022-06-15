import * as React from "react";
import * as ReactDOM from "react-dom";
import { Input } from "../src/chakra";

describe("it", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Input />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
