import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';

function CartOverview() {
  const cart = useSelector((store) => store.cart.cart);

  // * Redux recommend that we should put the selector callback in the useSelector hook in the cartSlice so in the central place and then export and use them in the place we needed
  // * Redux also recommend that we should use https://github.com/reduxjs/reselect for selector in Redux so if we really serious to create real project we should use reselect for selector in Redux instead use useSelector hook
  // * because reselect will optimization for performance and more, and it also help us return the array or object or reference type like that without memorize these data
  // * because object, array, reference type when we use useSelector and it returns a state and if this component re-render but the value object array don't change but it will re-render because now it's the same value but different pointer so reference right
  // * and we need to use something memo function, useMemo, useCallback hook but since we're using Redux we should use Redux way so in this case we can use reselect library here

  const stats = useSelector((store) => {
    const cartData = store.cart.cart;
    // * way 1
    // const totalQuantity = cartData.reduce(
    //   (sum, item) => sum + item.quantity,
    //   0,
    // );
    // const totalAmount = cartData.reduce(
    //   (sum, item) => sum + item.totalPrice,
    //   0,
    // );

    // * way 2: so we can use reduce method like this with object and we don't need to divide two reduce methods like the way 1 right
    const statData = cartData.reduce(
      (stat, item) => ({
        totalQuantity: stat.totalQuantity + item.quantity,
        totalAmount: stat.totalAmount + item.totalPrice,
      }),
      { totalQuantity: 0, totalAmount: 0 },
    );

    // * way 2
    return statData;

    // *way 1
    // return { totalQuantity, totalAmount };
  });
  // console.log(stats);

  // * and we can put two selector callback functions here in the cartSlice so in the central place
  // const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  // const totalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  // * and the convention and also the way Redux recommended that we should give the name of these selector callback functions with start with the get keyword
  // const totalQuantity = cart.reduce(getTotalCartQuantity, 0);
  // const totalAmount = cart.reduce(getTotalCartPrice, 0);
  const totalQuantity = useSelector(getTotalCartQuantity);
  const totalAmount = useSelector(getTotalCartPrice);

  return (
    <div className="flex items-center justify-center gap-x-3 self-end border-b-4 border-stone-800 bg-stone-700 py-3 text-center text-sm uppercase text-stone-200 sm:py-4 sm:text-base">
      <p className="space-x-2 font-light text-stone-300 sm:space-x-3">
        <span>{totalQuantity} pizzas</span>
        <span>${totalAmount}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
      {/* <a href="#">Open cart &rarr;</a> */}
    </div>
  );
}

export default CartOverview;
