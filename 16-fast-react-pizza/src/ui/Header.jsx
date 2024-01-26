import { Link } from 'react-router-dom';
import UserBox from '../features/user/UserBox';

function Header() {
  return (
    <header className="bg-yellow-500 uppercase">
      {/* *so to make our class names here can have the good order we can install this https://github.com/tailwindlabs/prettier-plugin-tailwindcss package
       * so this package here will help us sort the order of the class names and help us easy to manage this long class name right */}
      {/* <div className="p-3 pb-4 pt-4 text-center text-4xl tracking-widest"> */}
      <div className="p-3 pb-4 pt-4 text-center text-4xl tracking-[0.3rem]">
        <Link to="/">Fast React Pizza Co</Link>
      </div>
      <UserBox />
    </header>
  );
}

export default Header;
