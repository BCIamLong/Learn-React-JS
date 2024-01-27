import { Link } from 'react-router-dom';

function CartOverview() {
  return (
    <div className="flex items-center justify-center gap-x-3 self-end border-b-4 border-stone-800 bg-stone-700 py-3 text-center text-sm uppercase text-stone-200 sm:py-4 sm:text-base">
      <p className="space-x-2 font-light text-stone-300 sm:space-x-3">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
      {/* <a href="#">Open cart &rarr;</a> */}
    </div>
  );
}

export default CartOverview;
