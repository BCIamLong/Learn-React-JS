import { useState } from "react";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className={styles.formItem}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
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
