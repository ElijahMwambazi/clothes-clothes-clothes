import { createContext, useState, useEffect } from "react";

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

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartPriceTotal, setCartPriceTotal] = useState(0);

  // Add item to cart
  const addItemsToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  // Remove item from cart
  const removeItemsFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  // Clear item fron cart
  const clearItemFromCart = (itemToRemove) => {
    setCartItems(clearCartItem(cartItems, itemToRemove));
  };

  useEffect(() => {
    // TODO: get total number of items in cart
    const newCartItemCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    // TODO: get total price of items in cart
    const newCartPriceTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    setCartItemCount(newCartItemCount);
    setCartPriceTotal(newCartPriceTotal);
  }, [cartItems]);

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
