import { useDispatch, useSelector } from "react-redux";

import { selectCartItems } from "../../store/cart/cart.selector";

import {
  addItemsToCart,
  removeItemsFromCart,
  clearItemFromCart,
} from "../../store/cart/cart.action";

import {
  CheckoutItemContainer,
  ImageContainer,
  CheckoutItemImage,
  NamePrice,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from "./checkout-item.styles";

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const { name, imageUrl, price, quantity } = cartItem;

  const clearItemHandler = () =>
    dispatch(clearItemFromCart(cartItems, cartItem));
  const addItemHandler = () => dispatch(addItemsToCart(cartItems, cartItem));
  const removeItemHandler = () =>
    dispatch(removeItemsFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <CheckoutItemImage src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <NamePrice>{name}</NamePrice>
      <Quantity className="quantity">
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <NamePrice>{price}</NamePrice>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
