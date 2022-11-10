import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import Navigation from "./routes/navigation/navigation.route"
import Home from "./routes/home/home.route"
import Authentication from "./routes/authentication/authentication.route"
import Shop from "./routes/shop/shop.route"
import Checkout from "./routes/checkout/checkout.route"

import { setIsCartOpen } from "./store/cart/cart.action"
import { checkUserSession } from "./store/user/user.action"

import { selectIsCartOpen } from "./store/cart/cart.selector"

const App = () => {
  const dispatch = useDispatch()

  // ! Subcribe and unsubscribe user
  useEffect(() => {
    dispatch(checkUserSession())
  }, [dispatch]);

  const isCartOpen = useSelector(selectIsCartOpen)

  const closeCart = () => {
    // TODO: check if cart is open
    if (isCartOpen) {
      // if open, close cart
      return dispatch(setIsCartOpen(!isCartOpen))
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
