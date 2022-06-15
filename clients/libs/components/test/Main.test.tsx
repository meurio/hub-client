import * as React from "react";
import * as ReactDOM from "react-dom";
import { Main } from "../src";

describe("it", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Main>Lorem ipsum</Main>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
