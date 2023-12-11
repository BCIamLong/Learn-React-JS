import styles from "./Logo.module.css";
import reactLogo from "../assets/react.svg";

function Logo() {
  return (
    <div className={styles.logo}>
      <img src={reactLogo} alt="React logo" />
      <h1>The Atomic Blog</h1>
    </div>
  );
}

export default Logo;
