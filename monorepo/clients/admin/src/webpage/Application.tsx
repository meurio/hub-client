import { createContext, useReducer, useContext } from "react";
import type { Reducer } from "react";
import { reducer as appReducer, initialState } from "./reducers";
import type { State as StateApp } from "./reducers";

export interface Action {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

export interface IApplicationContext {
  state: StateApp;
  dispatch: (action: Action) => void;
}

export const applicationContext = createContext<IApplicationContext>({
  state: initialState,
  dispatch: (action) => console.log("application ->", action)
});

// eslint-disable-next-line react/prop-types
const Application: React.FC = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const [state, dispatch] = useReducer<Reducer<StateApp, Action>>(appReducer, initialState);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <applicationContext.Provider value={{ state, dispatch }}>
      {children}
    </applicationContext.Provider>
  );
}

export const useAppState = (): IApplicationContext => useContext(applicationContext);

export default Application;