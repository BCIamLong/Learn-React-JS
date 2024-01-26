import { Link } from 'react-router-dom';

function CartOverview() {
  return (
    <div className="bg-stone-700 text-center text-stone-200">
      <p className="text-stone-300">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
      {/* <a href="#">Open cart &rarr;</a> */}
    </div>
  );
}

export default CartOverview;
