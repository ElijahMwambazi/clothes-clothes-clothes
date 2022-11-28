import { AnyAction } from "redux";

// *Type predicate
// (A function that verifies that a specific argument it recieves is going to be narrower)
type Matchable<AC extends () => AnyAction> =
  AC & {
    type: ReturnType<AC>["type"];
    match(
      action: AnyAction
    ): action is ReturnType<AC>;
  };

// Expects action creator with no parameter
export function withMatcher<
  AC extends () => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

// Expects action ceator with parameters
export function withMatcher<
  AC extends (
    ...args: any[]
  ) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

// *Implemetaion
// Actual withMather function
export function withMatcher(
  actionCreator: Function
) {
  const type = actionCreator().type;

  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}

// *Types
// Action type that defines action with payload. Takes generic T: type and generic P: payload
export type TActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

// Action type that defines action without payload. Takes generic T: type
export type TAction<T> = {
  type: T;
};

// Generic type definition for action creator with action and payload
export function createAction<T extends string, P>(
  type: T,
  payload: P
): TActionWithPayload<T, P>;

// Generic type definition for action creator with action...without payload
export function createAction<T extends string>(
  type: T,
  Payload: void
): TAction<T>;

// *Implimentation
// General action creator
export function createAction<T extends string, P>(
  type: T,
  payload: P
) {
  return { type, payload };
}
