import apiGraphql from "./api-graphql";
import asyncUpdateWidget, { UPDATE_WIDGET } from "./async-update-widget";

const spy = jest.spyOn(apiGraphql, "request");
const dispatch = jest.fn();

it("asyncUpdateWidget", () => {
  const widget = { id: 3, kind: 'draft' };
  
  asyncUpdateWidget(dispatch)(widget)
  const called = spy.mock.calls[0];

  expect(called[0]).toEqual(UPDATE_WIDGET);
  expect(called[1]).toEqual({
    id: widget.id,
    widget
  });
})