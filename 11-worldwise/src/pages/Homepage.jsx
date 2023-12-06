// import { Link } from "react-router-dom";

import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import AppNav from "../components/AppNav";

function Homepage() {
  return (
    <div>
      <AppNav />
      <PageNav />
      <h1 className="test">WorldWise</h1>
      {/* <a href="/product">Product</a> <br />
      <a href="/pricing">Pricing</a> */}
      {/* <Link to="/product">Product</Link>
      <Link to="/pricing">Pricing</Link> */}
      <Link to="/app">Go to the app</Link>
    </div>
  );
}

export default Homepage;
