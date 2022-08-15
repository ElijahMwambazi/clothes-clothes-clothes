import "./categories.styles.scss"

const App = () => {
  const categories = [
    {
      id: 1,
      title: "Hats"
    },
    {
      id: 2,
      title: "Jackets"
    },
    {
      id: 3,
      title: "Sneakers"
    },
    {
      id: 4,
      title: "Womens"
    },
    {
      id: 5,
      title: "Mens"
    },
  ]

  return (
    <div className="App">
      <div className="categories-container">
        {categories.map(({ id, title }) => (
          <div key={id} className="category-container">
            <div className="background-img"></div>
            <div className="category-content">
              <h2 className="category-title">{title}</h2>
              <p className="shop-now">Shop Now</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
