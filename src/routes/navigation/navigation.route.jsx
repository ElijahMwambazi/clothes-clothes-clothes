import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import {
  useSelector,
  useDispatch,
} from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

import { signOutStart } from "../../store/user/user.action";

import CartIcon from "../../components/cart-icon/cart-icon.components";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.components";

import { ReactComponent as CrownLogo } from "../../assets/crown.svg";

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles";

const Navigation = () => {
  const currentUser = useSelector(
    selectCurrentUser
  );
  const isCartOpen = useSelector(
    selectIsCartOpen
  );
  const dispatch = useDispatch();

  const signOutHandler = () =>
    dispatch(signOutStart());

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo />
        </LogoContainer>
        <NavLinks>
          <NavLink to="shop">Shop</NavLink>
          {currentUser ? (
            <NavLink
              as="span"
              onClick={signOutHandler}
            >
              Sign Out
            </NavLink>
          ) : (
            <NavLink to="auth">Sign In</NavLink>
          )}
          {currentUser && <CartIcon />}
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
