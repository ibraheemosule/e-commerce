import { useReducer, Dispatch } from "react";

type Action = {
  payload: State;
};

type State = {
  [key: string]: string;
};

const reducer = (state: State, action: Action) => ({
  ...state,
  ...action.payload,
});

const useFillForm = (initialState: State): [State, Dispatch<Action>] => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
};

export default useFillForm;
