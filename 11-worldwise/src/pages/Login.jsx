import PageNav from "../components/PageNav";
import styles from "./Login.module.css";

function Login() {
  return (
    <div className="container">
      <div className={styles.login}>
        <PageNav />
        <main className={styles.main}>
          <form action="" className={styles.form}>
            <div className={styles.formItem}>
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="text"
                placeholder="jack@example.com"
                required
              />
            </div>
            <div className={styles.formItem}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••"
                required
              />
            </div>
            <button>Login</button>
          </form>
        </main>
      </div>
    </div>
  );
}

export default Login;
