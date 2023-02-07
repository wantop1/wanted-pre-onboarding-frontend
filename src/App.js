import Layout from "./components/Layout/Layout";
import { Switch, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import MainPage from "./pages/MainPage";
import Todo from "./pages/Todo";

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/todo">
            <Todo />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
