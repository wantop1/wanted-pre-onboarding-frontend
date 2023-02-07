import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";
import classes from "./MainHeader.module.css";

const MainHeader = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/");
  };

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/todo">Todo</Link>
          </li>
          <li>{!authCtx.isLoggedIn && <Link to="/signin">Sign in</Link>}</li>
          <li>{!authCtx.isLoggedIn && <Link to="/signup">Sign up</Link>}</li>
          <li>
            {authCtx.isLoggedIn && (
              <button onClick={logoutHandler}>Logout</button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
