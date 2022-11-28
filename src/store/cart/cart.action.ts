import {
  createAction,
  TActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.utils";

import { TCategoryItem } from "../categories/categories.types";

import {
  CART_ACTION_TYPES,
  TCartItem,
} from "./cart.types";

// *TYPES
// Return action type for setIsCartOpen
export type TSetIsCartOpen = TActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

// Return action type for setCartItems
export type TSetCartItems = TActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  TCartItem[]
>;

// // Type of actions the cart reducer can accept
// export type TCartAction =
//   | TSetIsCartOpen
//   | TSetCartItems;

// *IMPLEMENTATION
const addCartItem = (
  cartItems: TCartItem[],
  productToAdd: TCategoryItem
): TCartItem[] => {
  // TODO: Check if cartItem contains productToADD
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  // if found, increase quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          }
        : cartItem
    );
  }

  // return new array with modified cartItems
  return [
    ...cartItems,
    { ...productToAdd, quantity: 1 },
  ];
};

const removeCartItem = (
  cartItems: TCartItem[],
  productToRemove: TCartItem
): TCartItem[] => {
  // TODO: Find cartItem to remove
  const existingCartItem = cartItems.find(
    (cartItem) =>
      cartItem.id === productToRemove.id
  );

  // TODO: Check if productToRemove quantity in cartItem is 1
  if (
    existingCartItem &&
    existingCartItem.quantity === 1
  ) {
    return cartItems.filter(
      (cartItem) =>
        cartItem.id !== productToRemove.id
    );
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? {
          ...cartItem,
          quantity: cartItem.quantity - 1,
        }
      : cartItem
  );
};

const clearCartItem = (
  cartItems: TCartItem[],
  itemToRemove: TCartItem
): TCartItem[] => {
  return cartItems.filter(
    (cartItem) => cartItem.id !== itemToRemove.id
  );
};

// *Actions
// Set cart open or closed
export const setIsCartOpen = withMatcher(
  (isCartOpen: boolean): TSetIsCartOpen =>
    createAction(
      CART_ACTION_TYPES.SET_IS_CART_OPEN,
      isCartOpen
    )
);

export const setCartItems = withMatcher(
  (cartItems: TCartItem[]): TSetCartItems =>
    createAction(
      CART_ACTION_TYPES.SET_CART_ITEMS,
      cartItems
    )
);

// Add item to cart
export const addItemsToCart = (
  cartItems: TCartItem[],
  productToAdd: TCategoryItem
): TSetCartItems => {
  const newCartItems = addCartItem(
    cartItems,
    productToAdd
  );

  return setCartItems(newCartItems);
};

// Remove item from cart
export const removeItemsFromCart = (
  cartItems: TCartItem[],
  productToRemove: TCartItem
): TSetCartItems => {
  const newCartItems = removeCartItem(
    cartItems,
    productToRemove
  );

  return setCartItems(newCartItems);
};

// Clear item fron cart
export const clearItemFromCart = (
  cartItems: TCartItem[],
  itemToRemove: TCartItem
): TSetCartItems => {
  const newCartItems = clearCartItem(
    cartItems,
    itemToRemove
  );

  return setCartItems(newCartItems);
};
