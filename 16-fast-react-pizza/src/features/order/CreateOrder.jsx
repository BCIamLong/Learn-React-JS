// import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../store';
import { clearCart, getTotalCartPrice } from '../cart/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';
import { fetchAddress, getUser } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  // const cart = fakeCart;
  const cart = useSelector((store) => store.cart.cart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const totalPrice = withPriority
    ? totalCartPrice + totalCartPrice * 0.2
    : totalCartPrice;
  // const user = useSelector((store) => store.user);
  const {
    username,
    address: userAddress,
    position: userPosition,
    error: geoError,
    status: addressStatus,
  } = useSelector(getUser);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const dispatch = useDispatch();
  const isLoading = addressStatus === 'loading';
  // const userAddress = useSelector(getUserAddress);

  // * we can use this useActionData custom hook to access the data return from action
  // * in this case we access to the errors send from action function but it can be any other type not only for error
  // * but the common use case is handle error like what we are doing
  const formErrors = useActionData();

  if (!cart.length) return;

  return (
    <div className="px-3 py-4 sm:py-8">
      <h2 className="pb-8 text-2xl font-semibold sm:mb-6">
        Ready to order? Lets go!
      </h2>
      {/* <button onClick={() => dispatch(fetchAddress())}>
        Test get position
      </button> */}
      {/* <form> */}
      {/* * to deal with form in react router to submit an action we need to use Form component from react router DOM
       * so it looks like a form of html we have the method and we also have an action so we can specify where the action come like action = "/order/new"
       * but we can also don't need this action because react router by default will find the closest of the path so closest route have the action
       * so because we're dealing with react router with form and we need to use the Form component come from react router to the form can work as well in react router*/}
      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-3 flex flex-col sm:mb-6 sm:flex-row sm:gap-3">
          <label className="mb-2 text-sm text-stone-600 sm:basis-40 sm:text-xl">
            First Name
          </label>
          <div className="grow">
            <input
              className="input"
              type="text"
              name="customer"
              // defaultValue={user.username} //* to set default value for the input and then we can still update the value of this input
              // ! if we use value value={user.username} then this is always this value even we type something in the input it is still this value
              // * but in this case the name of user need to be consistent and i think that we should disabled this input field and alway the user name so in this case we take the first name
              value={username.split(' ')[0]}
              // value={user.username.split(' ')[0]}
              disabled
              required
            />
          </div>
        </div>

        {/* *https://tailwindcss.com/docs/flex-basis */}

        <div
          className={`mb-3 flex flex-col sm:mb-6 sm:flex-row sm:items-center sm:gap-3`}
        >
          <label className="relative mb-2 text-sm text-stone-600 sm:basis-40 sm:text-xl">
            Phone number
            {formErrors?.phone && (
              <span className="left-0 ml-3 text-xs font-semibold text-red-600 sm:absolute sm:-bottom-5 sm:ml-0">
                {formErrors.phone}
              </span>
            )}
          </label>
          <div className={`grow`}>
            <input
              className={`input w-full  ${formErrors?.phone ? 'border-2 border-red-500 bg-red-100' : ''}`}
              type="tel"
              name="phone"
              required
            />
          </div>
          {/* * so we can render the error right here when we have some error from phone number right */}
        </div>

        <div
          className={`${isLoading ? 'pointer-events-none opacity-70 ' : ''} relative mb-4 flex flex-col sm:mb-8 sm:flex-row sm:items-center sm:gap-3`}
        >
          <label className="mb-2 text-sm text-stone-600 sm:basis-40 sm:text-xl">
            Address
            {/* * we can also use this geoError to check it instead use addressStatus === 'error' both of ways are good to go*/}
            {addressStatus === 'error' && (
              <span className="left-0 ml-3 text-xs font-semibold text-red-600 sm:absolute sm:-bottom-5 sm:ml-0">
                {geoError}
              </span>
            )}
          </label>
          <div className="flex grow gap-2 sm:gap-4">
            <input
              className={`input w-full ${geoError ? 'border-2 border-red-500 bg-red-100' : ''}`}
              type="text"
              name="address"
              defaultValue={userAddress}
              required
            />
            {/* <input
              className="w-full rounded-full border-2 border-white px-3 py-1 text-sm text-stone-700 focus:border-2 focus:border-yellow-400 focus:outline-none"
              type="text"
              name="address"
              required
            /> */}
            {/* <Button
              type="form"
              onClick={(e) => {
                e.preventDefault();
                dispatch(fetchAddress());
              }}
            >
              Get position
            </Button> */}
          </div>
          <span className="absolute right-0.5 top-0 disabled:opacity-40">
            {!userAddress && (
              <Button
                type="form"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                {isLoading ? 'Processing' : ' Get position'}
              </Button>
            )}
          </span>
          {/* * so we use trick like with the cart so we use input hidden right here and we add the GPS of the user when we have position, so if the user type the address manually we can return the position with empty string
           * so we want to add this position behind right it's not thing for user can input right and this is nice trick when we deal with the Form component from React router */}
          <input
            type="hidden"
            name="position"
            value={
              userPosition.latitude && userPosition.longitude
                ? `${userPosition.latitude},${userPosition.longitude}`
                : ''
            }
          />
        </div>

        <div className="mb-6 flex items-center gap-2 sm:mb-9">
          <input
            className="h-4 w-4 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-1"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label
            className="italic text-stone-700 sm:text-xl"
            htmlFor="priority"
          >
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />

          <Button type="primary" disabled={isSubmitting || isLoading}>
            {isSubmitting
              ? 'Placing order'
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>

          {/* <button disabled={isSubmitting}>
            {isSubmitting ? 'Placing order' : 'Order now'}
          </button> */}
        </div>
      </Form>
      {/* </form> */}
    </div>
  );
}

// ! notice that: this Form of react router here can work with post, patch and delete method but it will not work with get method
// * so if we want to use get method in some case maybe we need to do something different right

// * and like the loader now we also need the action function for the Form component so this action function will call when the Form submit in that route have this action function

// * it's common to call the action function so that the convention we can call it is action or something that we want but the follow the convention is also good
export const action = async ({ request }) => {
  // * and like the loader function in this function we can also can access to the special argument which is called request
  // * and this request here is basically the form data send from the Form component when we submit so we type something on the form and submit and that's data in this request
  // * but it's raw data so therefore we need to convert it to form data and then also convert it the object to easy to look and also use this data
  const formData = await request.formData(); //* convert raw data to form data also need some time like we do with json() remember that
  const data = Object.fromEntries(formData);
  // console.log(data);
  const order = {
    ...data,
    // priority: data.priority === 'on',
    priority: data.priority === 'true', //* now this value come from the checkbox input then it will be 'true' or 'false' so it's boolean but since it's value of input so it will be convert to input right
    // * and therefore we need to check it like this so with string not true and false with boolean type
    cart: JSON.parse(data.cart),
  };

  const errors = {};
  if (!isValidPhone(order.phone)) errors.phone = `Your phone is invalid`;
  console.log(errors);
  if (Object.keys(errors).length > 0) return errors;

  console.log(order);

  // console.log(order);
  const newOrder = await createOrder(order);
  // console.log(newOrder);

  // ! so with this trick or hack we can access tot he dispatch function but of course we shouldn't overuse this way because it will take away a couple of optimizations of Redux for this page so order/new page
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
  //! return null;
  // return newOrder;
};

// * and now when we have the action function now we can connected to the route so the order/new route

export default CreateOrder;
