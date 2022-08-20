import {
  signInWithGooglePopup,
  createUserDocFromAuth,
} from "../../utils/firebase/firebase.utils";
import "./sign-in.styles.scss";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();

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
  };

  return (
    <div className="sign-in">
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Sign in with Google</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
