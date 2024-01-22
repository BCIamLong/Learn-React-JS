import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div>
        <Link to="/">Fast React Pizza Co</Link>
      </div>
      <h2>John Nas</h2>
    </header>
  );
}

export default Header;
