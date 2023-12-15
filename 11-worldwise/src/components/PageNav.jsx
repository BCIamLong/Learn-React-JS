import { NavLink, Link } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";
import { useAuth } from "../contexts/authContext";

function PageNav() {
  const { isAuthenticated, user } = useAuth();

  return (
    <nav className={styles.nav}>
      <ul>
        <li className={styles.logo}>
          {/* <NavLink to="/">
            <img src="../../public/logo.png" />
            <Logo />
          </NavLink> */}
          <Link to="/">
            {/* <img src="../../public/logo.png" /> */}
            <Logo />
          </Link>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li className={styles.login}>
          {/* {user.name ? ( */}
          {isAuthenticated ? (
            <NavLink to="/app">{user.name}</NavLink>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
