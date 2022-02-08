import apiGraphql from "./api-graphql";
import asyncDestroyBlock, { DELETE_LOGIC_BLOCK } from "./async-destroy-block";

const spy = jest.spyOn(apiGraphql, "request");
const dispatch = jest.fn();

it("asyncDestroyBlock", () => {
  const block = { id: 1, created_at: new Date() };
  
  asyncDestroyBlock(dispatch)(block)
  const called = spy.mock.calls[0];

  expect(called[0]).toEqual(DELETE_LOGIC_BLOCK);
  expect(called[1]).toEqual({
    id: block.id,
    block: {...block, deleted_at: new Date().toUTCString()}
  });
})