import { Routes, Route } from "react-router-dom"
import Navigation from "./routes/navigation/navigation.route"
import Home from "./routes/home/home.route"
import Authentication from "./routes/authentication/authentication.route"
import Shop from "./routes/shop/shop.route"

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
