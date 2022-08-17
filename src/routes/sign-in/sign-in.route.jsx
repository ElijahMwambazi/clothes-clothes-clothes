import {
  signInWithGooglePopup,
  createUserDocFromAuth,
} from "../../utils/firebase/firebase.utils";
import { Fragment } from "react";
import "./sign-in.styles.scss";

const SignIn = () => {
  const logGoogleUser = async () => {
    const user = await signInWithGooglePopup();
    console.log("User data from google: ", user);
    const userDocRef = await createUserDocFromAuth(user);
  };

  return (
    <Fragment>
      <div className="sign-in">
        <h1>Sign In</h1>
        <button onClick={logGoogleUser}>Sign in with Google</button>
      </div>
    </Fragment>
  );
};

export default SignIn;
