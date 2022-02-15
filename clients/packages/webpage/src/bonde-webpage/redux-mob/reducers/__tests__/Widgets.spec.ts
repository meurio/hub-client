import * as t from '../../ActionTypes';
import reducer, { initialState } from '../Widgets';
import { createAction } from '../../action-creators/CreateAction';

describe('Testing widgets reducers', () => {
  describe('Fetch widgets', () => {
    it('should trigger FETCH_WIDGETS_REQUEST action and change to expected state', () => {
      const action = { type: t.FETCH_WIDGETS_REQUEST };
      const nextState = reducer(initialState, action);
      expect(nextState).toEqual({
        ...initialState,
        fetching: true,
      });
    });

    it('should trigger FETCH_BLOCKS_REQUEST action and change to expected state', () => {
      const requestState = {
        ...initialState,
        fetching: true,
      };
      const data = [
        { id: 1, kind: 'draft' },
        { id: 2, kind: 'draft' },
      ];
      const action = { type: t.FETCH_WIDGETS_SUCCESS, payload: data };
      const nextState = reducer(requestState, action);
      expect(nextState).toEqual({
        ...requestState,
        isLoaded: true,
        fetching: false,
        data,
      });
    });

    it('should trigger FETCH_BLOCKS_REQUEST action and change to expected state', () => {
      const requestState = {
        ...initialState,
        fetching: true,
      };
      const error = '500 Internal Server Error';
      const action = { type: t.FETCH_WIDGETS_FAILURE, payload: error };
      const nextState = reducer(requestState, action);
      expect(nextState).toEqual({
        ...requestState,
        isLoaded: true,
        fetching: false,
        error,
      });
    });
  });
});

describe('Update widgets', () => {
  const fetchState = {
    ...initialState,
    isLoaded: true,
    data: [
      { id: 1, kind: 'draft' },
      { id: 2, kind: 'draft' },
    ],
  };

  const fetchRequestState = {
    ...fetchState,
    saving: true,
  };

  it('should trigger UPDATE_WIDGET_REQUEST action and change to expected state', () => {
    const action = { type: t.UPDATE_WIDGET_REQUEST };
    const nextState = reducer(fetchState, action);
    expect(nextState).toEqual(fetchRequestState);
  });

  it('should trigger UPDATE_WIDGET_SUCCESS action and change to expected state', () => {
    const widget = { id: 1, kind: 'content' };
    const action = { type: t.UPDATE_WIDGET_SUCCESS, payload: widget };
    const nextState = reducer(fetchRequestState, action);
    expect(nextState).toEqual({
      ...fetchRequestState,
      saving: false,
      data: fetchRequestState.data.map(w => {
        if (w.id === widget.id) return widget;
        else return w;
      }),
    });
  });

  it('should trigger UPDATE_WIDGET_FAILURE action and change to expected state', () => {
    const error = '500 Internal Server Error';
    const action = { type: t.UPDATE_WIDGET_FAILURE, payload: error };
    const nextState = reducer(fetchRequestState, action);
    expect(nextState).toEqual({
      ...fetchRequestState,
      saving: false,
      error,
    });
  });
});

describe('Add widget', () => {
  it('should trigger ADD_WIDGETS_SUCCESS action and change to expected state', () => {
    const fetchState = {
      ...initialState,
      isLoaded: true,
      data: [
        { id: 1, kind: 'draft', block_id: 2 },
        { id: 2, kind: 'draft', block_id: 2 },
      ],
    };
    const payload = [{ id: 3, kind: 'draft', block_id: 3 }];
    const action = { type: t.ADD_WIDGETS_SUCCESS, payload };
    const nextState = reducer(fetchState, action);
    expect(nextState).toEqual({
      ...fetchState,
      data: [...fetchState.data, ...payload],
    });
  });
});

describe('Selects mobilization', () => {
  it('should reset widgets reducer when SELECT_MOBILIZATION', () => {
    const fetchState = {
      ...initialState,
      isLoaded: true,
      data: [{ id: 1, kind: 'draft', block_id: 1 }],
    };
    const action = { type: t.SELECT_MOBILIZATION };
    const nextState = reducer(fetchState, action);
    expect(nextState).toEqual(initialState);
  });
});

describe('', () => {
  it('should change saving state to true when requesting', () => {
    const action = { type: t.WIDGET_FORM_ENTRY_CREATE_REQUEST };
    const nextState = reducer(initialState, action);

    expect(nextState.saving).toBeTruthy();
  });
  it('should change saving state to false when succeeded', () => {
    const currentInitialState = { ...initialState, saving: true };
    const action = { type: t.WIDGET_FORM_ENTRY_CREATE_SUCCESS };
    const nextState = reducer(currentInitialState, action);

    expect(nextState.saving).toBeFalsy();
  });
  it('should change saving state to false and error state with message when failed', () => {
    const currentInitialState = { ...initialState, saving: true };
    const failurePayload = {
      error: 'Form widget entry create request error message!',
    };
    const action = createAction(
      t.WIDGET_FORM_ENTRY_CREATE_FAILURE,
      failurePayload.error
    );
    const nextState = reducer(currentInitialState, action);

    expect(nextState.saving).toBeFalsy();
    expect(nextState.error).toBeTruthy();
    expect(typeof nextState).toBe('object');
    expect(nextState).toEqual({
      ...currentInitialState,
      saving: false,
      ...failurePayload,
    });
  });
});
