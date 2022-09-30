import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import {
  CartPriceTotalBase,
  TotalText,
  CartPriceTotalSmall,
  CartPriceTotalLarge,
} from "./cart-price-total.styles";

export const TOTAL_TYPE_CLASSES = {
  total_base: "total-base",
  total_small: "total-small",
  total_large: "total-large",
};

const getTotalType = (totalType = TOTAL_TYPE_CLASSES.total_base) =>
  ({
    [TOTAL_TYPE_CLASSES.total_base]: CartPriceTotalBase,
    [TOTAL_TYPE_CLASSES.total_small]: CartPriceTotalSmall,
    [TOTAL_TYPE_CLASSES.total_large]: CartPriceTotalLarge,
  }[totalType]);

const CartPriceTotal = ({ totalType }) => {
  const { cartPriceTotal } = useContext(CartContext);

  const CustomTotal = getTotalType(totalType);

  return (
    <CustomTotal>
      <TotalText>Total: </TotalText>
      <span className="total-count">{`K ${cartPriceTotal}`}</span>
    </CustomTotal>
  );
};

export default CartPriceTotal;
