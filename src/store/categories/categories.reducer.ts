import { AnyAction } from "redux";

import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./categories.action";

import { TCategory } from "./categories.types";

// Type of state for categories
export type TCategoriesState = {
  readonly categories: TCategory[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

// Initial state for categories
const CATEGORIES_INITIAL_STATE: TCategoriesState =
  {
    categories: [],
    isLoading: false,
    error: null,
  };

// Categories reducer
export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action: AnyAction
): TCategoriesState => {
  if (fetchCategoriesStart.match(action)) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (fetchCategoriesSuccess.match(action)) {
    return {
      ...state,
      isLoading: false,
      categories: action.payload,
    };
  }

  if (fetchCategoriesFailed.match(action)) {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  }

  return state;
};
