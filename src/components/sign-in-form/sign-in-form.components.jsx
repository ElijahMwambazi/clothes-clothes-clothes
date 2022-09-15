import { useState } from "react";
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  createUserDocFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // Log user with google popup
  const logGoogleUser = async () => {
    await signInWithGooglePopup();
  };

  // Handle submitions
  const submissionHandler = async (event) => {
    event.preventDefault();

    try {
      // Sign in user with email and password
      await signInAuthUserWithEmailAndPassword(email, password);

      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Password entered does not match account");
          break;
        case "auth/user-not-found":
          alert("No user is associated with email");
          break;
      }

      console.log(
        "Encountered error while attempting to sign in:",
        error.message
      );
    }
  };

  // Handle change in input fields
  const changeHandler = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  // Reset input fields
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={submissionHandler}>
        <FormInput
          label="email"
          inputOptions={{
            required: true,
            type: "email",
            pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
            onChange: changeHandler,
            name: "email",
            value: email,
          }}
        />
        <FormInput
          label="password"
          inputOptions={{
            required: true,
            type: "password",
            pattern:
              "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$",
            onChange: changeHandler,
            name: "password",
            value: password,
          }}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={logGoogleUser}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
