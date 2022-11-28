import {
  createAction,
  TActionWithPayload,
  TAction,
  withMatcher,
} from "../../utils/reducer/reducer.utils";

import {
  CATEGORIES_ACTION_TYPES,
  TCategory,
} from "./categories.types";

// *TYPES
// Return type for fetchCategoriesStart
export type TFetchCategoriesStart =
  TAction<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;

// Return type for fetchCategoriesSuccess
export type TFetchCategoriesSuccess =
  TActionWithPayload<
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    TCategory[]
  >;

// Return type for fetchCategoriesFailed
export type TFetchCategoriesFailed =
  TActionWithPayload<
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
    Error
  >;

// // Type of actions the categories reducer can accept
// export type TCategoriesAction =
//   | TFetchCategoriesStart
//   | TFetchCategoriesSuccess
//   | TFetchCategoriesFailed;

// *Implimentation (Categories action creators)
// Action creator to start fetching categories
export const fetchCategoriesStart = withMatcher(
  (): TFetchCategoriesStart =>
    createAction(
      CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START
    )
);

// Action creator for a successfull fetching of categories
export const fetchCategoriesSuccess = withMatcher(
  (
    categoriesArray: TCategory[]
  ): TFetchCategoriesSuccess =>
    createAction(
      CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
      categoriesArray
    )
);

// Action creator for a failed fetching of categories
export const fetchCategoriesFailed = withMatcher(
  (error: Error): TFetchCategoriesFailed =>
    createAction(
      CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
      error
    )
);
