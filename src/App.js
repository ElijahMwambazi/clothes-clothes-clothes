import { useContext, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"

import Navigation from "./routes/navigation/navigation.route"
import Home from "./routes/home/home.route"
import Authentication from "./routes/authentication/authentication.route"
import Shop from "./routes/shop/shop.route"
import Checkout from "./routes/checkout/checkout.route"

import { onAuthStateChangedListener, createUserDocFromAuth } from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.action"

import { CartContext } from "./contexts/cart.context"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        try {
          await createUserDocFromAuth(user);
        } catch (error) {
          if (
            error.code === "auth/popup-closed-by-user" ||
            error.code === "auth/popup-blocked"
          )
            return;
          console.log("Encountered error while creating user:", error.message);
        }
      }

      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, [dispatch]);

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
