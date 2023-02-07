const Login = () => {
  return (
    <>
      <input data-testid="email-input" type="email" />
      <input data-testid="password-input" type="password" />
      <button data-testid="signin-button">로그인</button>
    </>
  );
};

export default Login;
