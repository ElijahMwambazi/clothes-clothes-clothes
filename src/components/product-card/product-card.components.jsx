import { useContext } from "react";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";
import { CartContext } from "../../contexts/cart.context";

import { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
  ProductCardContainer,
  Image,
  Footer,
  Name,
  Price,
  ProductCardButton,
} from "./product-card.styles";

const ProductCard = ({ product }) => {
  const currentUser = useSelector(selectCurrentUser);

  const { imageUrl, name, price } = product;
  const { addItemsToCart } = useContext(CartContext);

  const addProductToCart = () => addItemsToCart(product);

  return (
    <ProductCardContainer>
      <Image src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{`K ${price}`}</Price>
      </Footer>
      {currentUser && (
        <ProductCardButton
          buttonType={BUTTON_TYPE_CLASSES.inverted}
          onClick={addProductToCart}
        >
          Add to cart
        </ProductCardButton>
      )}
    </ProductCardContainer>
  );
};

export default ProductCard;
