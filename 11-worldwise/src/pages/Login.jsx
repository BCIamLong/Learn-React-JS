import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import PageNav from "../components/PageNav";
import Button from "../components/Button";
import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // const user = login(email, password);
    // if (!user) return;
    login(email, password);
    // if (!isAuthenticated) return;

    // navigate("/app");
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className="container">
      <div className={styles.login}>
        <PageNav />
        <main className={styles.main}>
          <form action="" className={styles.form} onSubmit={handleSubmit}>
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
            <Button type="primary">Login</Button>
            {/* <button>Login</button> */}
          </form>
        </main>
      </div>
    </div>
  );
}

export default Login;
