import Layout from "./components/Layout/Layout";
import { Switch, Route, Redirect } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import MainPage from "./pages/MainPage";
import Todo from "./pages/Todo";
import AuthContext from "./store/auth-context";
import { useContext } from "react";

const App = () => {
  const authCtx = useContext(AuthContext);
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/signin">
            {authCtx.isLoggedIn && <Redirect to="todo" />}
            {!authCtx.isLoggedIn && <Signin />}
          </Route>
          <Route path="/signup">
            {authCtx.isLoggedIn && <Redirect to="todo" />}
            {!authCtx.isLoggedIn && <Signup />}
          </Route>
          <Route path="/todo">
            {!authCtx.isLoggedIn && <Redirect to="signin" />}
            {authCtx.isLoggedIn && <Todo />}
          </Route>

          <Route path="/*">
          <Redirect to="/" />
        </Route>
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
