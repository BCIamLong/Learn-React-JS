import styles from "./Header.module.css";
import Logo from "./Logo";
import PropTypes from "prop-types";

Header.propTypes = {
  children: PropTypes.any,
};

function Header({ children }) {
  return (
    <header className={styles.header}>
      <Logo />
      {children}
    </header>
  );
}

export default Header;
