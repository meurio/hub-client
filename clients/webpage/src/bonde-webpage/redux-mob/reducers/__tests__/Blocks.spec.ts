import * as at from '../../ActionTypes';
import reducer, { initialState } from '../Blocks';

describe("Testing block's reducer", () => {
  describe('Fetch blocks actions', () => {
    const requestState = {
      ...initialState,
      fetching: true,
    };
    it('should trigger FETCH_BLOCKS_REQUEST action and change to expected state', () => {
      const action = { type: at.FETCH_BLOCKS_REQUEST };
      const nextState = reducer(initialState, action);
      expect(nextState).toEqual({
        ...initialState,
        fetching: true,
      });
    });

    it('should trigger FETCH_BLOCKS_SUCCESS action and change to expected state', () => {
      const data = [{ id: 1 }, { id: 2 }];
      const action = { type: at.FETCH_BLOCKS_SUCCESS, payload: data };
      const nextState = reducer(requestState, action);
      expect(nextState).toEqual({
        ...requestState,
        isLoaded: true,
        fetching: false,
        data,
      });
    });

    it('should trigger FETCH_BLOCKS_FAILURE action and change to expected state', () => {
      const error = '500 Internal Server Error';
      const action = { type: at.FETCH_BLOCKS_FAILURE, payload: error };
      const nextState = reducer(requestState, action);
      expect(nextState).toEqual({
        ...requestState,
        isLoaded: true,
        fetching: false,
        error,
      });
    });
  });

  describe('Update blocks actions', () => {
    const fetchState = {
      ...initialState,
      isLoaded: true,
      data: [
        { id: 1, name: 'Lorem' },
        { id: 2, name: 'Ipsum' },
      ],
    };

    const fetchRequestState = {
      ...fetchState,
      saving: true,
    };

    it('should trigger UPDATE_BLOCK_REQUEST action and change to expected state', () => {
      const action = { type: at.UPDATE_BLOCK_REQUEST };
      const nextState = reducer(fetchState, action);
      expect(nextState).toEqual(fetchRequestState);
    });

    it('should trigger UPDATE_BLOCK_SUCCESS action and change to expected state', () => {
      const block = { id: 1, name: 'Dolor' };
      const action = { type: at.UPDATE_BLOCK_SUCCESS, payload: block };
      const nextState = reducer(fetchRequestState, action);
      expect(nextState).toEqual({
        ...fetchRequestState,
        saving: false,
        data: fetchRequestState.data.map(b => {
          if (b.id === block.id) return block;
          else return b;
        }),
      });
    });

    it('should trigger UPDATE_BLOCK_FAILURE action and change to expected state', () => {
      const error = '500 Internal Server Error';
      const action = { type: at.UPDATE_BLOCK_FAILURE, payload: error };
      const nextState = reducer(fetchRequestState, action);
      expect(nextState).toEqual({
        ...fetchRequestState,
        saving: false,
        error,
      });
    });
  });

  describe('Misc', () => {
    const data = [
      { id: 1, name: 'Lorem', bg_image: 'tmp://old.png' },
      { id: 2, name: 'Ipsum', bg_class: 'bg-5' },
    ];
    const fetchState = {
      ...initialState,
      isLoaded: true,
      data,
    };

    it('should trigger CHANGE_BLOCK_BACKGROUND action and change to expected state', () => {
      const payload = { ...data[0], bg_image: 'tmp://new.png' };
      const action = { type: at.CHANGE_BLOCK_BACKGROUND, payload };
      const nextState = reducer(fetchState, action);
      expect(nextState).toEqual({
        ...nextState,
        data: [payload, data[1]],
      });
    });

    it('should trigger UPDATE_BLOCK_BATCH action and change to expected state', () => {
      const payload = {
        blocks: {
          blocks: [{ ...data[0], bg_image: 'tmp://new.png' }],
        },
      };

      const action = { type: at.UPDATE_BLOCK_BATCH, payload };
      const nextState = reducer(fetchState, action);
      expect(nextState).toEqual({
        ...nextState,
        data: [payload.blocks.blocks[0], data[1]],
      });
    });

    it('should reset blocks reducer when SELECT_MOBILIZATION', () => {
      const fetchState = {
        ...initialState,
        isLoaded: true,
        data: [{ id: 1, name: 'Lorem', bg_class: 'bg-5' }],
      };
      const action = { type: at.SELECT_MOBILIZATION };
      const nextState = reducer(fetchState, action);
      expect(nextState).toEqual(initialState);
    });
  });

  describe('Add blocks actions', () => {
    const data = [
      { id: 1, name: 'Lorem', bg_image: 'tmp://old.png' },
      { id: 2, name: 'Ipsum', bg_class: 'bg-5' },
    ];
    const fetchState = {
      ...initialState,
      isLoaded: true,
      data,
    };

    it('should trigger ADD_BLOCK_REQUEST action and change to expected state', () => {
      const action = { type: at.ADD_BLOCK_REQUEST };
      const nextState = reducer(fetchState, action);
      expect(nextState).toEqual({
        ...fetchState,
        saving: true,
      });
    });

    it('should trigger ADD_BLOCK_SUCCESS action and change to expected state', () => {
      const payload = { id: 3, name: 'Dolor', bg_class: 'bg-2' };
      const state = { ...fetchState, saving: true };
      const action = { type: at.ADD_BLOCK_SUCCESS, payload };
      const nextState = reducer(state, action);
      expect(nextState).toEqual({
        ...state,
        saving: false,
        data: [...data, payload],
      });
    });

    it('should trigger ADD_BLOCK_FAILURE action and change to expected state', () => {
      const payload = '500 Internal server error';
      const state = { ...fetchState, saving: true };
      const action = { type: at.ADD_BLOCK_FAILURE, payload };
      const nextState = reducer(state, action);
      expect(nextState).toEqual({
        ...state,
        saving: false,
        error: payload,
      });
    });
  });

  describe('Destroy blocks', () => {
    const data = [
      { id: 1, name: 'Lorem', bg_image: 'tmp://old.png' },
      { id: 2, name: 'Ipsum', bg_class: 'bg-5' },
    ];
    const fetchState = {
      ...initialState,
      isLoaded: true,
      data,
    };

    it('should trigger DESTROY_BLOCK_REQUEST action and change to expected state', () => {
      const action = { type: at.DESTROY_BLOCK_REQUEST };
      const nextState = reducer(fetchState, action);
      expect(nextState).toEqual({
        ...fetchState,
        saving: true,
      });
    });

    it('should trigger DESTROY_BLOCK_SUCCESS action and change to expected state', () => {
      const payload = data[0];
      const state = { ...fetchState, saving: true };
      const action = { type: at.DESTROY_BLOCK_SUCCESS, payload };
      const nextState = reducer(state, action);
      expect(nextState).toEqual({
        ...state,
        saving: false,
        data: data.filter(b => b.id !== payload.id),
      });
    });

    it('should trigger DESTROY_BLOCK_FAILURE action and change to expected state', () => {
      const payload = '500 Internal server error';
      const state = { ...fetchState, saving: true };
      const action = { type: at.DESTROY_BLOCK_FAILURE, payload };
      const nextState = reducer(state, action);
      expect(nextState).toEqual({
        ...state,
        saving: false,
        error: payload,
      });
    });
  });
});
