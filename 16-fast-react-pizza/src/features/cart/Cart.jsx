import { Link } from 'react-router-dom';

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const cart = fakeCart;

  return (
    <div>
      <Link
        // * https://tailwindcss.com/docs/transition-property
        // transition-colors, transition-transform...
        className="transition-all duration-150 hover:text-yellow-500 hover:underline"
        to="/menu"
      >
        &larr; Back to menu
      </Link>

      <h2>Your cart, %NAME%</h2>

      <div className="flex items-center gap-x-3">
        {/* * https://tailwindcss.com/docs/ring-width */}
        <Link
          className="inline-block rounded-full bg-yellow-400 px-3 py-2 font-semibold text-stone-700 transition-colors duration-200 visited:bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 active:bg-yellow-300"
          to="/order/new"
        >
          Order pizzas
        </Link>
        <button className="inline-block rounded-full border-2  border-yellow-200 bg-yellow-100 px-3 py-2 transition-colors duration-200 hover:bg-white">
          Clear cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
