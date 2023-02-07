import { useState } from "react";
import MainForm from "../components/Form/MainForm";
import MainInput from "../components/Input/MainInput";
import MainButton from "../components/Button/MainButton";

const EMAIL_INPUT_ERROR = "이메일에는 @가 포함되어야 합니다.";
const PASSWORD_INPUT_ERROR = "비밀번호의 길이는 8자 이상이어야 합니다.";

const Signin = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false);

  const emailIsValid = enteredEmail.includes("@");
  const emailIsInvalid = !emailIsValid && enteredEmailTouched;

  const passwordIsValid = enteredPassword.length >= 8;
  const passwordIsInvalid = !passwordIsValid && enteredPasswordTouched;

  const formIsValid = emailIsValid && passwordIsValid;

  const emailHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const emailBlurHandler = () => {
    setEnteredEmailTouched(true);
  };

  const passwordHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const passwordBlurHandler = () => {
    setEnteredPasswordTouched(true);
  };

  const loginSubmitHandler = (event) => {
    event.preventDefault();

    const loginData = {
      email: enteredEmail,
      password: enteredPassword,
    };
    console.log(loginData);

    setEnteredEmail("");
    setEnteredPassword("");
  };
  return (
    <>
      <MainForm onSubmit={loginSubmitHandler}>
        <h1>Sign in</h1>
        <MainInput
          onBlur={emailBlurHandler}
          onChange={emailHandler}
          error={emailIsInvalid}
          errorMessage={EMAIL_INPUT_ERROR}
          value={enteredEmail}
          dataTestid="email-input"
          type="email"
          id="email"
          htmlFor="email"
          labelName="email"
        />

        <MainInput
          onBlur={passwordBlurHandler}
          onChange={passwordHandler}
          error={passwordIsInvalid}
          errorMessage={PASSWORD_INPUT_ERROR}
          value={enteredPassword}
          dataTestid="password-input"
          type="password"
          id="password"
          htmlFor="password"
          labelName="password"
        />
        <MainButton data-testid="signin-button" disabled={!formIsValid}>
          sign in
        </MainButton>
      </MainForm>
    </>
  );
};

export default Signin;
