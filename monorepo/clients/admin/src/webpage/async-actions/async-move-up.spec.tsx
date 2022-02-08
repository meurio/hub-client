import apiGraphql from "./api-graphql";
import asyncMoveUp, { UPDATE_BLOCKS_POSITION } from "./async-move-up";

const spy = jest.spyOn(apiGraphql, "request");
const dispatch = jest.fn();

it("asyncMoveUp", () => {
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
  
  asyncMoveUp(dispatch, state)(block)
  const called = spy.mock.calls[0];

  expect(called[0]).toEqual(UPDATE_BLOCKS_POSITION);
  expect(called[1]).toEqual({
    objects: [
      { ...block, position: 1 },
      { id: 1, position: 2 },
    ],
  });
})