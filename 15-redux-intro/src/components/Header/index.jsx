import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <h1>The React-Redux Bank 🏦</h1>
      {/* <p>$123,456,00</p> */}
    </div>
  );
}

export default Header;
