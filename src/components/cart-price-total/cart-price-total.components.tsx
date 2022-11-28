import { FC } from "react";

import { useSelector } from "react-redux";

import { selectCartPriceTotal } from "../../store/cart/cart.selector";

import {
  CartPriceTotalBase,
  TotalText,
  CartPriceTotalSmall,
  CartPriceTotalLarge,
} from "./cart-price-total.styles";

export enum TOTAL_TYPE_CLASSES {
  total_base = "total-base",
  total_small = "total-small",
  total_large = "total-large",
}

const getTotalType = (
  totalType = TOTAL_TYPE_CLASSES.total_base
): typeof CartPriceTotalBase =>
  ({
    [TOTAL_TYPE_CLASSES.total_base]:
      CartPriceTotalBase,
    [TOTAL_TYPE_CLASSES.total_small]:
      CartPriceTotalSmall,
    [TOTAL_TYPE_CLASSES.total_large]:
      CartPriceTotalLarge,
  }[totalType]);

export type TCartPriceTotalProps = {
  totalType: TOTAL_TYPE_CLASSES;
};

const CartPriceTotal: FC<
  TCartPriceTotalProps
> = ({ totalType }) => {
  const cartPriceTotal = useSelector(
    selectCartPriceTotal
  );
  const CustomTotal = getTotalType(totalType);

  return (
    <CustomTotal>
      <TotalText>Total: </TotalText>
      <span className="total-count">{`K ${cartPriceTotal}`}</span>
    </CustomTotal>
  );
};

export default CartPriceTotal;
