import { Link } from 'react-router-dom';
import UserBox from '../features/user/UserBox';
import SearchOrder from '../features/order/SearchOrder';

function Header() {
  return (
    <header className="flex items-center justify-between self-start border-y-4 border-dashed border-yellow-600 bg-yellow-500  px-6 uppercase  sm:px-4">
      {/* *so to make our class names here can have the good order we can install this https://github.com/tailwindlabs/prettier-plugin-tailwindcss package
       * so this package here will help us sort the order of the class names and help us easy to manage this long class name right */}
      {/* <div className="p-3 pb-4 pt-4 text-center text-4xl tracking-widest"> */}
      <div className="py-4 text-center text-2xl font-bold tracking-[0.3rem] sm:py-6 sm:text-4xl">
        <Link to="/">Fast React Pizza Co</Link>
      </div>
      <div className="flex items-center gap-x-3 sm:gap-x-6">
        <SearchOrder />
        <UserBox />
      </div>
    </header>
  );
}

export default Header;
