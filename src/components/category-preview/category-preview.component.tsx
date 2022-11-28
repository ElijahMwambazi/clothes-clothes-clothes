import ProductCard from "../product-card/product-card.components";

import { TCategoryItem } from "../../store/categories/categories.types";

import {
  CategoryPreviewContainer,
  CategoryPreviewTitle,
  Preview,
} from "./category-preview.styles";
import { FC } from "react";

export type TCategoryPreviewProps = {
  title: string;
  products: TCategoryItem[];
};

const CategoryPreview: FC<
  TCategoryPreviewProps
> = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h1>
        <CategoryPreviewTitle to={title}>
          {title.toUpperCase()}
        </CategoryPreviewTitle>
      </h1>
      <Preview>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => {
            return (
              <ProductCard
                key={product.id}
                product={product}
              />
            );
          })}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
