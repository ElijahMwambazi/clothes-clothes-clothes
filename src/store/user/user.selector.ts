import { createSelector } from "reselect";
import { TRootState } from "../store";

import { TUserState } from "./user.reducer";

export const selectUserReducer = (
  state: TRootState
): TUserState => state.user;

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (user) => user.currentUser
);
