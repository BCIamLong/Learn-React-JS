// Test ID:

import { useFetcher, useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import OrderItem from './OrderItem';
import { useEffect } from 'react';

// const order = {
//   id: "ABCDEF",
//   customer: "Jonas",
//   phone: "123456789",
//   address: "Arroios, Lisbon , Portugal",
//   priority: true,
//   estimatedDelivery: "2027-04-25T10:00:00",
//   cart: [
//     {
//       pizzaId: 7,
//       name: "Napoli",
//       quantity: 3,
//       unitPrice: 16,
//       totalPrice: 48,
//     },
//     {
//       pizzaId: 5,
//       name: "Diavola",
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32,
//     },
//     {
//       pizzaId: 3,
//       name: "Romana",
//       quantity: 1,
//       unitPrice: 15,
//       totalPrice: 15,
//     },
//   ],
//   position: "-9.000,38.000",
//   orderPrice: 95,
//   priorityPrice: 19,
// };

function Order() {
  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data && fetcher.state !== 'idle') return;

    fetcher.load('/menu');
  }, []);

  // console.log(fetcher?.data?.at(0)?.ingredients);
  return (
    <div className="px-7 py-6">
      <div className="pb-4">
        <h2 className="mb-6 text-2xl font-semibold">Order ID: {id}</h2>

        <div className="flex items-center justify-start gap-3">
          <h2 className="text-xl">Status</h2>
          {priority && (
            <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-2 py-1 text-xs font-semibold capitalize text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="mb-3 flex items-center justify-start gap-3 text-stone-600">
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs uppercase italic">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      {/* https://tailwindcss.com/docs/flex-wrap */}
      <ul className="divide-y divide-stone-300 border-t border-stone-300">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === 'loading'}
            ingredients={
              fetcher.data?.find((pizza) => item.pizzaId === pizza.id)
                ?.ingredients ?? []
            }
          />
        ))}
      </ul>

      <div className="flex flex-col gap-2  border-t border-stone-300 py-3 text-stone-600">
        <p>
          Price pizza:{' '}
          <span className="font-semibold">{formatCurrency(orderPrice)}</span>
        </p>
        {priority && (
          <p>
            Price priority:{' '}
            <span className="font-semibold">
              {formatCurrency(priorityPrice)}
            </span>
          </p>
        )}
        <p>
          To pay on delivery:{' '}
          <span className="font-bold text-stone-700">
            {formatCurrency(orderPrice + priorityPrice)}
          </span>
        </p>
      </div>
    </div>
  );
}

export const loader = async function ({ params }) {
  const order = getOrder(params.orderId);
  return order;
};

export default Order;
