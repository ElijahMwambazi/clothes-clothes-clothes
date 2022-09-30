import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
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
  const { imageUrl, name, price } = product;
  const { currentUser } = useContext(UserContext);
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
