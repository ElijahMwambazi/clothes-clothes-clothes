import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import CartPriceTotal, {
  TOTAL_TYPE_CLASSES,
} from "../cart-price-total/cart-price-total.components";
import CartItem from "../cart-item/cart-item.components";

import { selectCartItems } from "../../store/cart/cart.selector";

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItemsContainer,
} from "./cart-dropdown.styles";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <CartDropdownContainer>
      <CartItemsContainer>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItemsContainer>
      <CartPriceTotal totalType={TOTAL_TYPE_CLASSES.total_small} />
      <Button
        buttonType={BUTTON_TYPE_CLASSES.base}
        onClick={goToCheckoutHandler}
      >
        GO TO CHECKOUT
      </Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
