import apiGraphql from "./api-graphql";
import asyncUpdateBlock, { UPDATE_BLOCK } from "./async-update-block";

const spy = jest.spyOn(apiGraphql, "request");
const dispatch = jest.fn();

it("asyncUpdateBlock", () => {
  const block = { id: 3, position: 2 };
  
  asyncUpdateBlock(dispatch)(block)
  const called = spy.mock.calls[0];

  expect(called[0]).toEqual(UPDATE_BLOCK);
  expect(called[1]).toEqual({
    id: block.id,
    block
  });
})