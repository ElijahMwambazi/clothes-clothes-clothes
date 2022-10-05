import { useSelector } from "react-redux";
import CheckoutItem from "../../components/checkout-item/checkout-item.components";
import CartPriceTotal, {
  TOTAL_TYPE_CLASSES,
} from "../../components/cart-price-total/cart-price-total.components";
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
} from "./checkout.styles";
import { selectCartItems } from "../../store/cart/cart.selector";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>

      {cartItems.map((cartItem) => {
        const { id } = cartItem;
        return <CheckoutItem key={id} cartItem={cartItem} />;
      })}

      <CartPriceTotal totalType={TOTAL_TYPE_CLASSES.total_large} />
    </CheckoutContainer>
  );
};

export default Checkout;
