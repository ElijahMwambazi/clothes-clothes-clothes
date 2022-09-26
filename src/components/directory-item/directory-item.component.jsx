import "./directory-item.styles.scss";

const DirectoryItem = ({ category }) => {
  const { imageUrl, title } = category;

  return (
    <div className="directory-container">
      <div
        className="background-img"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="directory-content">
        <h2 className="directory-title">{title}</h2>
        <p className="shop-now">Shop Now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;
