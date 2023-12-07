// import { nav } from "./AppNav.module.css";
import { Link } from "react-router-dom";
import styles from "./AppNav.module.css";
import Logo from "./Logo";

function AppNav() {
  return (
    <nav className={styles.nav}>
      <Link to="/">
        <Logo />
      </Link>
    </nav>
  );
}

export default AppNav;
