// *Types
// Categories action types
export enum CATEGORIES_ACTION_TYPES {
  FETCH_CATEGORIES_START = "categories/FETCH_CATEGORIES_START",
  FETCH_CATEGORIES_SUCCESS = "categories/FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_FAILED = "categories/FETCH_CATEGORIES_FAILED",
}

// types for categoriesItem
export type TCategoryItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

// Types for categories
export type TCategory = {
  title: string;
  imageUrl: string;
  items: TCategoryItem[];
};

export type TCategoryMap = {
  [key: string]: TCategoryItem[];
};
