import { createSelector } from "reselect";
import { TRootState } from "../store";

import { TCategoriesState } from "./categories.reducer";

import { TCategoryMap } from "./categories.types";

const selectCategoryReducer = (
  state: TRootState
): TCategoriesState => state.categories;

// Selector for categories in categries state
const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

// Selector for isLoading in categories state
export const selectCategoriesIsLoading =
  createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
  );

// Selector for categoriesMap in categories
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): TCategoryMap =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;

      return acc;
    }, {} as TCategoryMap)
);
