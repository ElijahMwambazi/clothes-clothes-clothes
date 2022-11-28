import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";
import { useDispatch } from "react-redux";

import { signUpStart } from "../../store/user/user.action";

import FormInput from "../form-input/form-input.component";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../button/button.component";
import {
  AuthError,
  AuthErrorCodes,
} from "firebase/auth";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(
    defaultFormFields
  );
  const {
    displayName,
    email,
    password,
    confirmPassword,
  } = formFields;

  // Handle submitions
  const submissionHandler = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Get user authentication info
      dispatch(
        signUpStart(email, password, displayName)
      );

      resetFormFields();
    } catch (error) {
      if (
        (error as AuthError).code ===
        AuthErrorCodes.EMAIL_EXISTS
      ) {
        alert(
          "Can not create user. Email already in use."
        );
      }

      alert(
        `Encountered error while creating user: ${error}`
      );
    }
  };

  // Handle change in input fields
  const changeHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  // Reset input fields
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>
        Sign up with your email and password
      </span>
      <form onSubmit={submissionHandler}>
        <FormInput
          label="Name"
          inputOptions={{
            required: true,
            type: "text",
            onChange: changeHandler,
            name: "displayName",
            value: displayName,
          }}
        />
        <FormInput
          label="Email"
          inputOptions={{
            required: true,
            type: "email",
            pattern:
              "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
            onChange: changeHandler,
            name: "email",
            value: email,
          }}
        />
        <FormInput
          label="Password"
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
        <FormInput
          label="Confirm Password"
          inputOptions={{
            required: true,
            type: "password",
            onChange: changeHandler,
            name: "confirmPassword",
            value: confirmPassword,
          }}
        />

        <Button
          buttonType={BUTTON_TYPE_CLASSES.base}
          type="submit"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
