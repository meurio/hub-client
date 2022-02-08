import apiGraphql from "./api-graphql";
import asyncMoveDown, { UPDATE_BLOCKS_POSITION } from "./async-move-down";

const spy = jest.spyOn(apiGraphql, "request");
const dispatch = jest.fn();

it("asyncMoveDown", () => {
  const block = { id: 3, position: 2 };
  const state = {
    blocks: {
      data: [
        { id: 1, position: 1 },
        { id: 2, position: 3 },
        { id: 3, position: 2 },
      ]
    }
  }
  
  asyncMoveDown(dispatch, state)(block)
  const called = spy.mock.calls[0];

  expect(called[0]).toEqual(UPDATE_BLOCKS_POSITION);
  expect(called[1]).toEqual({
    objects: [
      { ...block, position: 3 },
      { id: 2, position: 2 },
    ],
  });
})