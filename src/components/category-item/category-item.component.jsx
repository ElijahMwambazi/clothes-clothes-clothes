import "./category-item.styles.scss";

const CategoryItem = ({ category }) => {
  const { imageUrl, title } = category;

  return (
    <div className="category-container">
      <div
        className="background-img"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="category-content">
        <h2 className="category-title">{title}</h2>
        <p className="shop-now">Shop Now</p>
      </div>
    </div>
  );
};

export default CategoryItem;
