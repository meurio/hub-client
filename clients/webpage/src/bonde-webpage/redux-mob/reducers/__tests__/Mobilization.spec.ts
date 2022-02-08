import * as t from '../../ActionTypes';
import reducer, { initialState } from '../Mobilizations';

describe('Testing mobilization reducers', () => {
  describe('Add mobilization', () => {
    it('should trigger ADD_MOBILIZATION_REQUEST action and change to expected state', () => {
      const state = { ...initialState, isLoaded: true };
      const action = { type: t.ADD_MOBILIZATION_REQUEST };
      const nextState = reducer(state, action);
      expect(nextState).toEqual({
        ...state,
        saving: true,
      });
    });

    it('should trigger ADD_MOBILIZATION_SUCCESS action and change to expected state', () => {
      const state = { ...initialState, isLoaded: true, saving: true };
      const payload = { id: 1, name: 'Lorem', goal: 'Ipsum' };
      const action = { type: t.ADD_MOBILIZATION_SUCCESS, payload };
      const nextState = reducer(state, action);
      expect(nextState).toEqual({
        ...state,
        saving: false,
        data: [payload, ...state.data],
        currentId: payload.id,
      });
    });

    it('should trigger ADD_MOBILIZATION_FAILURE action and change to expected state', () => {
      const state = { ...initialState, isLoaded: true, saving: true };
      const payload = '500 Internal Server Error';
      const action = { type: t.ADD_MOBILIZATION_FAILURE, payload };
      const nextState = reducer(state, action);
      expect(nextState).toEqual({
        ...state,
        saving: false,
        error: payload,
      });
    });
  });

  describe('Fetch mobilizations', () => {
    it('should trigger FETCH_MOBILIZATIONS_REQUEST action and change to expected state', () => {
      const action = { type: t.FETCH_MOBILIZATIONS_REQUEST };
      const nextState = reducer(initialState, action);
      expect(nextState).toEqual({
        ...initialState,
        fetching: true,
      });
    });

    it('should trigger FETCH_MOBILIZATIONS_SUCCESS action and change to expected state', () => {
      const state = { ...initialState, fetching: true };
      const payload = [
        { id: 1, name: 'Lorem' },
        { id: 2, name: 'Ipsum' },
      ];
      const action = { type: t.FETCH_MOBILIZATIONS_SUCCESS, payload };
      const nextState = reducer(state, action);
      expect(nextState).toEqual({
        ...state,
        isLoaded: true,
        fetching: false,
        data: payload,
      });
    });

    it('should trigger FETCH_MOBILIZATIONS_FAILURE action and change to expected state', () => {
      const state = { ...initialState, fetching: true };
      const payload = '500 Internal Server Error';
      const action = { type: t.FETCH_MOBILIZATIONS_FAILURE, payload };
      const nextState = reducer(state, action);
      expect(nextState).toEqual({
        ...state,
        isLoaded: true,
        fetching: false,
        error: payload,
      });
    });
  });

  describe('Update mobilization', () => {
    const data = [
      { id: 1, name: 'Lorem' },
      { id: 2, name: 'Ipsum' },
    ];
    const loadedState = { ...initialState, isLoaded: true, data };

    it('should trigger UPDATE_MOBILIZATION_REQUEST action and change to expected state', () => {
      const action = { type: t.UPDATE_MOBILIZATION_REQUEST };
      const nextState = reducer(loadedState, action);
      expect(nextState).toEqual({
        ...loadedState,
        saving: true,
      });
    });

    it('should trigger UPDATE_MOBILIZATION_SUCCESS action and change to expected state', () => {
      const state = { ...loadedState, saving: true };
      const payload = { ...data[0], name: 'Edited' };
      const action = { type: t.UPDATE_MOBILIZATION_SUCCESS, payload };
      const nextState = reducer(state, action);
      expect(nextState).toEqual({
        ...state,
        saving: false,
        data: [payload, data[1]],
      });
    });

    it('should trigger UPDATE_MOBILIZATION_FAILURE action and change to expected state', () => {
      const state = { ...loadedState, saving: true };
      const payload = '500 Internal Server Error';
      const action = { type: t.UPDATE_MOBILIZATION_FAILURE, payload };
      const nextState = reducer(state, action);
      expect(nextState).toEqual({
        ...state,
        saving: false,
        error: payload,
      });
    });
  });

  describe('Select mobilization', () => {
    it('should trigger SELECT_MOBILIZATION action and change to expected state', () => {
      const state = {
        ...initialState,
        isLoaded: true,
        data: [
          { id: 1, name: 'Lorem' },
          { id: 2, name: 'Ipsum' },
        ],
      };
      const payload = 1;
      const action = { type: t.SELECT_MOBILIZATION, payload };
      let nextState = reducer(state, action);
      expect(nextState).toEqual({
        ...state,
        currentId: payload,
        reload: true,
      });
    });
  });

  describe('Toggle mobilization menu', () => {
    it('should trigger UPDATE_MOBILIZATION_FAILURE action and change mobilization status to on', () => {
      const payload = 1;
      const action = { type: t.TOGGLE_MOBILIZATION_MENU, payload };
      const nextState = reducer(initialState, action);
      expect(nextState).toEqual({
        ...initialState,
        menuActiveIndex: payload,
      });
    });

    it('should trigger UPDATE_MOBILIZATION_FAILURE action and change mobilization status to off', () => {
      const state = { ...initialState, menuActiveIndex: 1 };
      const action = { type: t.TOGGLE_MOBILIZATION_MENU, payload: 1 };
      const nextState = reducer(state, action);
      expect(nextState).toEqual({
        ...state,
        menuActiveIndex: undefined,
      });
    });
  });

  describe('Filter mobilization', () => {
    it('should trigger FILTER_MOBILIZATIONS_REQUEST action and change to expected state', () => {
      const action = { type: t.FILTER_MOBILIZATIONS_REQUEST };
      const nextState = reducer(initialState, action);
      expect(nextState).toEqual({
        ...initialState,
        fetching: true,
      });
    });

    it('should trigger FILTER_MOBILIZATIONS_SUCCESS action and change to expected state', () => {
      const state = { ...initialState, fetching: true };
      const payload = [{ id: 2, name: 'Ipsum' }];
      const action = { type: t.FILTER_MOBILIZATIONS_SUCCESS, payload };
      const nextState = reducer(state, action);
      expect(nextState).toEqual({
        ...state,
        fetching: false,
        isLoaded: true,
        data: payload,
        currentId: payload[0].id,
      });
    });

    it('should trigger FILTER_MOBILIZATIONS_FAILURE action and change to expected state', () => {
      const state = { ...initialState, fetching: true };
      const payload = '500 Internal Server Error';
      const action = { type: t.FILTER_MOBILIZATIONS_FAILURE, payload };
      const nextState = reducer(state, action);
      expect(nextState).toEqual({
        ...state,
        fetching: false,
        isLoaded: true,
        error: payload,
      });
    });
  });

  describe('Fetch widgets and blocks success in mobilization', () => {
    const state = { ...initialState, reload: true };

    it('should trigger FETCH_BLOCKS_SUCCESS action and change to expected state', () => {
      const action = { type: t.FETCH_BLOCKS_SUCCESS };
      const nextState = reducer(state, action);
      expect(nextState).toEqual({
        ...state,
        reload: false,
      });
    });

    it('should trigger FETCH_WIDGETS_SUCCESS action and change to expected state', () => {
      const action = { type: t.FETCH_WIDGETS_SUCCESS };
      const nextState = reducer(state, action);
      expect(nextState).toEqual({
        ...state,
        reload: false,
      });
    });
  });
});
