import { useContext } from "react"
import { Routes, Route } from "react-router-dom"
import Navigation from "./routes/navigation/navigation.route"
import Home from "./routes/home/home.route"
import Authentication from "./routes/authentication/authentication.route"
import Shop from "./routes/shop/shop.route"
import Checkout from "./routes/checkout/checkout.route"
import { CartContext } from "./contexts/cart.context"

const App = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext)

  const closeCart = () => {
    // TODO: check if cart is open
    if (isCartOpen) {
      // if open, close cart
      return setIsCartOpen(!isCartOpen)
    }
  }

  return (
    <div className="App" onClick={closeCart}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
