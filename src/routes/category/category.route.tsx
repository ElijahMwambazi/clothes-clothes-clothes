import {
  useState,
  useEffect,
  Fragment,
} from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ProductCard from "../../components/product-card/product-card.components";
import Spinner from "../../components/spinner/spinner.component";

import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/categories/categories.selector";

import {
  CategoryTitle,
  CategoryContainer,
} from "./category.styles";

type TCategoryRouteParams = {
  category: string;
};

const Category = () => {
  const { category } = useParams<
    keyof TCategoryRouteParams
  >() as TCategoryRouteParams;
  const categoriesMap = useSelector(
    selectCategoriesMap
  );
  const isLoading = useSelector(
    selectCategoriesIsLoading
  );
  const [products, setProducts] = useState(
    categoriesMap[category]
  );

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <CategoryTitle>
        {category.toUpperCase()}
      </CategoryTitle>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              );
            })}
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;
