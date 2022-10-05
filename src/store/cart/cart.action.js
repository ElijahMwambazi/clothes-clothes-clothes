import { createAction } from "../../utils/reducer/reducer.utils";

import { CART_ACTION_TYPES } from "./cart.types"


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

// Add item to cart
export const addItemsToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);

    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

// Remove item from cart
export const removeItemsFromCart = (cartItems, productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);

    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

// Clear item fron cart
export const clearItemFromCart = (cartItems, itemToRemove) => {
    const newCartItems = clearCartItem(cartItems, itemToRemove);

    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

// Set cart open or closed
export const setIsCartOpen = (isCartOpen) => (createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen))