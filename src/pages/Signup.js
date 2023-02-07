import MainForm from "../components/Form/MainForm";
import MainInput from "../components/Input/MainInput";
import MainButton from "../components/Button/MainButton";

const Signup = () => {
  return (
    <>
      <MainForm>
        <h1>sign up</h1>
        <MainInput
          dataTestid="email-input"
          type="email"
          id="email"
          htmlFor="email"
          labelName="email"
        />
        <MainInput
          dataTestid="password-input"
          type="password"
          id="password"
          htmlFor="password"
          labelName="password"
        />
        <MainButton data-testid="signin-button">sign up</MainButton>
      </MainForm>
    </>
  );
};

export default Signup;
