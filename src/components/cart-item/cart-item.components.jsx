import {
  CartItemContainer,
  CartItemImage,
  CartItemDetails,
  CartItemName,
} from "./cart-item.styles";

const CartItem = ({ cartItem }) => {
  const { imageUrl, name, price, quantity } = cartItem;

  return (
    <CartItemContainer>
      <CartItemImage src={imageUrl} alt={`${name}`} />
      <CartItemDetails>
        <CartItemName>{name}</CartItemName>
        <span className="price">
          {quantity} x K{price}
        </span>
      </CartItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
