// import { Link } from "react-router-dom";

import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
// import AppNav from "../components/AppNav";
import styles from "./Homepage.module.css";

function Homepage() {
  return (
    <div className="container">
      <div className={styles.homepage}>
        {/* <AppNav /> */}
        <PageNav />
        <main className={styles.main}>
          <h1 className="heading-primary">You travel the world.</h1>
          <h1 className="heading-primary ma-bt-sm">
            WorldWise keeps track of your adventures.
          </h1>

          <p>
            A world map that tracks your footsteps into every city you can think
            of. Never forget your wonderful experiences, and show your friends
            how you have wandered the world.
          </p>
          <Link to="/app">Start tracking now</Link>
        </main>
        {/* <a href="/product">Product</a> <br />
      <a href="/pricing">Pricing</a> */}
        {/* <Link to="/product">Product</Link>
      <Link to="/pricing">Pricing</Link> */}
      </div>
    </div>
  );
}

export default Homepage;
