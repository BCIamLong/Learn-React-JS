import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';

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
  const amount = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      {/* <Link
        // * https://tailwindcss.com/docs/transition-property
        // transition-colors, transition-transform...
        className="transition-all duration-150 hover:text-yellow-500 hover:underline"
        to="/menu"
      >
        &larr; Back to menu
      </Link> */}

      <h2 className="mb-3 mt-6 text-2xl font-semibold">
        Your cart, <span className="font-bold">%NAME%</span>
      </h2>

      <ul className="mb-6 flex flex-col gap-3 border-t border-stone-300 p-3">
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
        <li className="border-y border-stone-300 py-3 font-semibold">
          Total amount: €{amount}
        </li>
      </ul>

      <div className="flex items-center gap-x-3">
        {/* * https://tailwindcss.com/docs/ring-width */}
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>
        {/* <Link
          className="inline-block rounded-full bg-yellow-400 px-3 py-2 font-semibold text-stone-700 transition-colors duration-200 visited:bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 active:bg-yellow-300"
          to="/order/new"
        >
          Order pizzas
        </Link> */}
        <Button type="secondary">Clear cart</Button>
        {/* <button className="inline-block rounded-full border-2  border-yellow-200 bg-yellow-100 px-3 py-2 transition-colors duration-200 hover:bg-white">
          Clear cart
        </button> */}
      </div>
    </div>
  );
}

export default Cart;
