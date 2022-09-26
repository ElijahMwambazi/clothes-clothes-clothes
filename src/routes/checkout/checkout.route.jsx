import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.components";
import CartPriceTotal from "../../components/cart-price-total/cart-price-total.components";
import "./checkout.styles.scss";

const Checkout = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>

      {cartItems.map((cartItem) => {
        const { id } = cartItem;
        return <CheckoutItem key={id} cartItem={cartItem} />;
      })}

      <CartPriceTotal totalType="total_large" />
    </div>
  );
};

export default Checkout;
