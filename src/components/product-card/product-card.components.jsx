import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";
import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  const { imageUrl, name, price } = product;
  const { currentUser } = useContext(UserContext);
  const { addItemsToCart } = useContext(CartContext);

  const addProductToCart = () => addItemsToCart(product);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{`K ${price}`}</span>
      </div>
      {currentUser && (
        <Button buttonType="inverted" onClick={addProductToCart}>
          Add to cart
        </Button>
      )}
    </div>
  );
};

export default ProductCard;
