import { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import Spinner from "./components/spinner/spinner.component";

import { setIsCartOpen } from "./store/cart/cart.action";
import { checkUserSession } from "./store/user/user.action";

import { selectIsCartOpen } from "./store/cart/cart.selector";

// Lazy loaded routes
const Home = lazy(
  () => import("./routes/home/home.route")
);
const Authentication = lazy(
  () =>
    import(
      "./routes/authentication/authentication.route"
    )
);
const Shop = lazy(
  () => import("./routes/shop/shop.route")
);
const Checkout = lazy(
  () => import("./routes/checkout/checkout.route")
);

const Navigation = lazy(
  () =>
    import("./routes/navigation/navigation.route")
);

// Component
const App = () => {
  const dispatch = useDispatch();

  // ! Subcribe and unsubscribe user
  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  const isCartOpen = useSelector(
    selectIsCartOpen
  );

  const closeCart = () => {
    // TODO: check if cart is open
    if (isCartOpen) {
      // if open, close cart
      return dispatch(setIsCartOpen(!isCartOpen));
    }
  };

  return (
    <div className="App" onClick={closeCart}>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route
            path="/"
            element={<Navigation />}
          >
            <Route index element={<Home />} />
            <Route
              path="shop/*"
              element={<Shop />}
            />
            <Route
              path="auth"
              element={<Authentication />}
            />
            <Route
              path="checkout"
              element={<Checkout />}
            />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
