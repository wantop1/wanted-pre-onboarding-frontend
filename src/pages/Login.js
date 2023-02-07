import { useState } from "react";
import MainForm from "../components/Form/MainForm";
import MainInput from "../components/Input/MainInput";
import MainButton from "../components/Button/MainButton";

const Login = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const emailHandler = (event) => {
    console.log(event.target.value);
    setEnteredEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const loginSubmitHandler = (event) => {
    event.preventDefault();

    const loginData = {
      email: enteredEmail,
      password: enteredPassword,
    };
    console.log(loginData);
  };
  return (
    <>
      <MainForm onSubmit={loginSubmitHandler}>
        <h1>login</h1>
        <MainInput
          onChange={emailHandler}
          value={enteredEmail}
          dataTestid="email-input"
          type="email"
          id="email"
          htmlFor="email"
          labelName="email"
        />
        <MainInput
          onChange={passwordHandler}
          value={enteredPassword}
          dataTestid="password-input"
          type="password"
          id="password"
          htmlFor="password"
          labelName="password"
        />
        <MainButton data-testid="signin-button">login</MainButton>
      </MainForm>
    </>
  );
};

export default Login;
