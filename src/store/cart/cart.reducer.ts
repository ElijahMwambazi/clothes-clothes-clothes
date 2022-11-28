import { AnyAction } from "redux";

import {
  setIsCartOpen,
  setCartItems,
} from "./cart.action";

import { TCartItem } from "./cart.types";

export type TCartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: TCartItem[];
};

const CART_INITIAL_STATE: TCartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (
  state = CART_INITIAL_STATE,
  action: AnyAction
): TCartState => {
  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }

  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  return state;
};
