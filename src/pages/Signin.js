import { useState,useContext } from "react";
import { useHistory } from "react-router-dom";
import MainForm from "../components/UI/Form/MainForm";
import MainInput from "../components/UI/Input/MainInput";
import MainButton from "../components/UI/Button/MainButton";
import AuthContext from "../store/auth-context";
import LoadingSpinner from "../components/UI/Progress/LodingSpinner";
import { EMAIL_INPUT_ERROR,PASSWORD_INPUT_ERROR } from "../constants/error-messages";
import { REQUEST_URL } from "../constants/paths";
import { SESSION_EXPIRATION_TIME } from "../constants/numbers";

const Signin = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false);

  const [loading, setLoading] = useState(false);

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

  const loginSubmitHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${REQUEST_URL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      } else {
        const data = await response.json();
        const expirationTime = new Date(new Date().getTime() + SESSION_EXPIRATION_TIME);
        authCtx.login(data.access_token,expirationTime.toISOString());
        history.push("/todo");
      }
    } catch (error) {
      alert(error.message);
    }

    setEnteredEmail("");
    setEnteredEmailTouched(false);

    setEnteredPassword("");
    setEnteredPasswordTouched(false);

    setLoading(false);
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
        {loading && <LoadingSpinner/>}
        {!loading && (
          <MainButton dataTestid="signin-button" disabled={!formIsValid}>
            sign in
          </MainButton>
        )}
      </MainForm>
    </>
  );
};

export default Signin;
