import { createSelector } from "reselect";

import { TRootState } from "../store";

import { TCartState } from "./cart.reducer";

const selectCartReducer = (
  state: TRootState
): TCartState => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectCartItemCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (total, cartItem) =>
        total + cartItem.quantity,
      0
    )
);

export const selectCartPriceTotal =
  createSelector([selectCartItems], (cartItems) =>
    cartItems.reduce(
      (total, cartItem) =>
        total +
        cartItem.price * cartItem.quantity,
      0
    )
  );

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);
