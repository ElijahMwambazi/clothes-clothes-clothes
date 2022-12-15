import { FC, memo } from "react";
import { TCartItem } from "../../store/cart/cart.types";

import {
  CartItemContainer,
  CartItemImage,
  CartItemDetails,
  CartItemName,
} from "./cart-item.styles";

export type TCartItemProps = {
  cartItem: TCartItem;
};

const CartItem: FC<TCartItemProps> = memo(
  ({ cartItem }) => {
    const { imageUrl, name, price, quantity } =
      cartItem;

    return (
      <CartItemContainer>
        <CartItemImage
          src={imageUrl}
          alt={`${name}`}
        />
        <CartItemDetails>
          <CartItemName>{name}</CartItemName>
          <span className="price">
            {quantity} x K{price}
          </span>
        </CartItemDetails>
      </CartItemContainer>
    );
  }
);

export default CartItem;
