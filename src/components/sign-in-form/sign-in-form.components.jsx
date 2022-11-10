import { useState } from "react";
import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.action";

import { ButtonContainer } from "./sign-in-form.styles";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // Log user with google popup
  const logGoogleUser = async () => {
    dispatch(googleSignInStart());
  };

  // Handle submitions
  const submissionHandler = async (event) => {
    event.preventDefault();

    try {
      // Sign in user with email and password
      dispatch(emailSignInStart(email, password));

      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Password entered does not match account");
          break;
        case "auth/user-not-found":
          alert("No user is associated with email");
          break;
        default:
          console.log(error);
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
        <ButtonContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={logGoogleUser}
          >
            Google Sign In
          </Button>
        </ButtonContainer>
      </form>
    </div>
  );
};

export default SignInForm;
