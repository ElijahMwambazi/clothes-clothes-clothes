import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./cart-price-total.styles.scss";

const CartPriceTotal = ({ totalType }) => {
  const { cartPriceTotal } = useContext(CartContext);

  const TOTAL_TYPE_CLASSES = {
    total_small: "total-small",
    total_large: "total-large",
  };

  return (
    <div
      className={`cart-price-total-container ${TOTAL_TYPE_CLASSES[totalType]}`}
    >
      <span className="total-text">Total: </span>
      <span className="total-count">{`K ${cartPriceTotal}`}</span>
    </div>
  );
};

export default CartPriceTotal;
