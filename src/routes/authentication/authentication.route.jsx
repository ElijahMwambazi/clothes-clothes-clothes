import "./authentication.styles.scss";
import SignInForm from "../../components/sign-in-form/sign-in-form.components";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
