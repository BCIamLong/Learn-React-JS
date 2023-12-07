import { NavLink, Link } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";

function PageNav() {
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
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
