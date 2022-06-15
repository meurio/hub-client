import * as React from "react";
import * as ReactDOM from "react-dom";
import { Dropdown } from "../src";

describe("it", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Dropdown
        placeholder="Select your option"
        items={["One", "Two", "Tree"]}
        onSelect={() => {}}
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
