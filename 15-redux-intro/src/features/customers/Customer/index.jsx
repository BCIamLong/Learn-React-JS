import { useSelector } from "react-redux";
import styles from "./Customer.module.css";
import Form from "../../../components/Form";

// * and in here to access to the store we use the useSelect hook from react-redux

function Customer() {
  // * one thing notice that the name we use store.customer, so customer is the name of we give it when we combine the reducer functions remember that
  // * and so whatever name we give for the reducer when we create store will use to access like this so store.customer, if we named it a => store.a

  const customer = useSelector((store) => {
    // * in here we can do more computations
    // * so we do all manipulation as possible with the store in this callback function

    // * so we can do computations to get the data to format the data we want and then use it as we want and so on
    // return store.customer;

    // * so for example: we might only need some field from the customer like the full name and then in this case we can return only the full name
    return store.customer.fullName;
  });

  // * the thing we can do here now is like create the subscribed to the store so to the customer reducer
  // * and then all the components consume or subscribe this data state from that reducer will be re-render so it works like the Context API
  // * but of course behind the scenes Redux will do some optimization like the time we talked about optimization with Context API so like use memo, useMemo, useCallback or other way to optimization
  // * so Redux will behind the scenes do something like that

  // * and one thing we can see it's similar with us that the state change in store and all the components subscribe to that state will be re-render right

  console.log(customer);

  return (
    <div className={styles.customer}>
      <h2>Creating new customer</h2>
      <Form>
        <div>
          <label htmlFor="fullName">Customer full name</label>
          <input id="fullName" type="text" />
        </div>
        <div>
          <label htmlFor="nationalId">National ID</label>
          <input id="nationalId" type="text" />
        </div>
        <button>Create new customer</button>
      </Form>
      <ul>
        {/* now we can use it here to display the customer info right */}
        <li>{customer}</li>
      </ul>
    </div>
  );
}

export default Customer;
