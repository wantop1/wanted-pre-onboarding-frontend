const Signup = () => {
  return (
    <>
      <input data-testid="email-input" type="email" />
      <input data-testid="password-input" type="password" />
      <button data-testid="signup-button">회원가입</button>
    </>
  );
};

export default Signup;
