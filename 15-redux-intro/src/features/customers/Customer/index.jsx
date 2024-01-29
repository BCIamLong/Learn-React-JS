import { useDispatch } from "react-redux";
// import styles from "./Customer.module.css";
import Form from "../../../components/Form";
import { useState } from "react";
import { createCustomer } from "../customerSlice";

// * and in here to access to the store we use the useSelect hook from react-redux

// const customers = [];

function Customer() {
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");

  // * one thing notice that the name we use store.customer, so customer is the name of we give it when we combine the reducer functions remember that
  // * and so whatever name we give for the reducer when we create store will use to access like this so store.customer, if we named it a => store.a

  // const customer = useSelector((store) => {
  // * in here we can do more computations
  // * so we do all manipulation as possible with the store in this callback function

  // * so we can do computations to get the data to format the data we want and then use it as we want and so on
  // return store.customer;

  // * so for example: we might only need some field from the customer like the full name and then in this case we can return only the full name
  //   return store.customer.fullName;
  // });

  // * the thing we can do here now is like create the subscribed to the store so to the customer reducer
  // * and then all the components consume or subscribe this data state from that reducer will be re-render so it works like the Context API
  // * but of course behind the scenes Redux will do some optimization like the time we talked about optimization with Context API so like use memo, useMemo, useCallback or other way to optimization
  // * so Redux will behind the scenes do something like that

  // * and one thing we can see it's similar with us that the state change in store and all the components subscribe to that state will be re-render right

  // console.log(customer);
  // * to use dispatch function in react we use the useDispatch custom hook from the react redux
  // * and this function work exactly the same with the dispatch function we use like in core redux with store.dispatch() or in the useReducer hook
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    if (!fullName || !nationalId) return; //* use guard clause to check it already exists

    // * now we can import the action creators of customer to this component to auto create the event dispatch
    dispatch(createCustomer(fullName, nationalId));

    // dispatch(//* this is the second way when we don't use the Redux toolkit to dispatch many arguments instead we pass all arguments to the fields of object
    // * and dispatch it with the one argument only that object then destructure this object and use
    //   createCustomer({
    //     fullName,
    //     nationalId,
    //     createdAt: new Date().toLocaleDateString(),
    //   })
    // );
  }

  return (
    // <div className={styles.customer}>
    <div className="text-3xl bg-yellow-200 p-6 px-96 rounded-lg h-96">
      <h2 className="text-center text-5xl mb-9 font-semibold">
        Creating new customer
      </h2>
      <Form>
        <div className="flex items-center w-full justify-between ">
          <label htmlFor="fullName">Customer full name</label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="input-box">
          <label htmlFor="nationalId">National ID</label>
          <input
            id="nationalId"
            type="text"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
          />
        </div>
        <button
          className="mx-auto py-2 px-4 bg-green-400 rounded-full hover:bg-green-300 transition-all duration-150 font-semibold hover:-translate-y-1 hover:shadow-lg"
          onClick={handleClick}
        >
          Create new customer
        </button>
      </Form>
      {/* <ul> */}
      {/* now we can use it here to display the customer info right */}
      {/* <li>{customer}</li>
      </ul> */}
    </div>
  );
}

export default Customer;
