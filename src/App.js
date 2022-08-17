import { Routes, Route } from "react-router-dom"
import Navigation from "./routes/navigation/navigation.route"
import Home from "./routes/home/home.route"
import SignIn from "./routes/sign-in/sign-in.route"
import Shop from "./routes/shop/shop.route"

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App;
