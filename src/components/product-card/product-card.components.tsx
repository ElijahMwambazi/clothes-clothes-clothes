import {
  useSelector,
  useDispatch,
} from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";
import { selectCartItems } from "../../store/cart/cart.selector";

import { addItemsToCart } from "../../store/cart/cart.action";

import { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
  ProductCardContainer,
  Image,
  Footer,
  Name,
  Price,
  ProductCardButton,
} from "./product-card.styles";
import { TCategoryItem } from "../../store/categories/categories.types";
import { FC } from "react";

export type TProductCardProps = {
  product: TCategoryItem;
};

const ProductCard: FC<TProductCardProps> = ({
  product,
}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    selectCurrentUser
  );
  const cartItems = useSelector(selectCartItems);

  const { imageUrl, name, price } = product;

  const addProductToCart = () =>
    dispatch(addItemsToCart(cartItems, product));

  return (
    <ProductCardContainer>
      <Image src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{`K ${price}`}</Price>
      </Footer>
      {currentUser && (
        <ProductCardButton
          buttonType={
            BUTTON_TYPE_CLASSES.inverted
          }
          onClick={addProductToCart}
        >
          Add to cart
        </ProductCardButton>
      )}
    </ProductCardContainer>
  );
};

export default ProductCard;
