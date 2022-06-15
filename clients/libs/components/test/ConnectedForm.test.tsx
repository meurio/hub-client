import * as React from "react";
import * as ReactDOM from "react-dom";
import { ConnectedForm, InputField } from "../src";

describe("it", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <ConnectedForm
        onSubmit={() => {}}
        initialValues={{ city: "Belo Horizonte" }}
      >
        {() => <InputField name="city" />}
      </ConnectedForm>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
