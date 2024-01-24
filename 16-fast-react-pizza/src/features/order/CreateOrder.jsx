import { useState } from "react";
import { Form, redirect } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div>
      <h2>Ready to order? Lets go!</h2>

      {/* <form> */}
      {/* * to deal with form in react router to submit an action we need to use Form component from react router DOM
       * so it looks like a form of html we have the method and we also have an action so we can specify where the action come like action = "/order/new"
       * but we can also don't need this action because react router by default will find the closest of the path so closest route have the action
       * so because we're dealing with react router with form and we need to use the Form component come from react router to the form can work as well in react router*/}
      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <button>Order now</button>
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
    priority: data.priority === "on",
    cart: JSON.parse(data.cart),
  };

  // console.log(order);
  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
  // return newOrder;
};

// * and now when we have the action function now we can connected to the route so the order/new route

export default CreateOrder;
