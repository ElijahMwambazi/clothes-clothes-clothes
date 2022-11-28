import { Middleware } from "redux";

import { TRootState } from "../store/store";

export const loggerMiddlewar: Middleware<
  {},
  TRootState
> = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("currentState: ", store.getState());

  next(action);

  console.log("nextState: ", store.getState());
};
