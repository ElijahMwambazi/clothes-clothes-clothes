import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
  // TODO: Check if cartItem contains productToADD
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  // if found, increase quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // return new array with modified cartItems
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  // TODO: Find cartItem to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  // TODO: Check if productToRemove quantity in cartItem is 1
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, itemToRemove) => {
  // TODO: Find cartItem to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === itemToRemove.id
  );

  if (existingCartItem) {
    return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
  }
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemsToCart: () => {},
  removeItemsFromCart: () => {},
  clearItemFromCart: () => {},
  cartItemCount: 0,
  cartPriceTotal: 0,
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled type: ${type} in cartReducer`);
  }
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartItemCount: 0,
  cartPriceTotal: 0,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { isCartOpen, cartItems, cartItemCount, cartPriceTotal } = state;

  console.log(cartItems);

  // set cartItems
  const updateCartReducer = (newCartItems) => {
    // TODO: get total number of items in cart
    const newCartItemCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    // TODO: get total price of items in cart
    const newCartPriceTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartItemCount: newCartItemCount,
        cartPriceTotal: newCartPriceTotal,
      })
    );
  };

  // Add item to cart
  const addItemsToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);

    updateCartReducer(newCartItems);
  };

  // Remove item from cart
  const removeItemsFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);

    updateCartReducer(newCartItems);
  };

  // Clear item fron cart
  const clearItemFromCart = (itemToRemove) => {
    const newCartItems = clearCartItem(cartItems, itemToRemove);

    updateCartReducer(newCartItems);
  };

  // set cart open or closed
  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemsToCart,
    removeItemsFromCart,
    clearItemFromCart,
    cartItemCount,
    cartPriceTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
