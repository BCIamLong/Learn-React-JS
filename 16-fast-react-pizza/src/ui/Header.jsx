import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      {/* *so to make our class names here can have the good order we can install this https://github.com/tailwindlabs/prettier-plugin-tailwindcss package
       * so this package here will help us sort the order of the class names and help us easy to manage this long class name right */}
      <div className="bg-slate-400 p-3 pb-4 pt-4 text-center text-4xl">
        <Link to="/">Fast React Pizza Co</Link>
      </div>
      <h2 className="text-3xl font-bold">John Nas</h2>
    </header>
  );
}

export default Header;
