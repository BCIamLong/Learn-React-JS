import { combineReducers, createStore } from "redux";

// ************************************ CUSTOMER REDUCER ************************************
const customerInitialState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};
const customerReducer = function (state = customerInitialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: payload.fullName,
        nationalId: payload.nationalId,
        createdAt: payload.createdAt,
      };
    case "customer/updateName":
      return { ...state, fullName: payload };
    default:
      return state;
  }
};

function createCustomer(fullName, nationalId) {
  // * we can also  create createdAt in the reducer function but it might create side effect and we shouldn't do it in reducer function because it's pure function
  // * we should take all business logic in the reducer function but in this case it creates side effect so we don't do that right

  return {
    type: "customer/createCustomer",
    payload: {
      fullName,
      nationalId,
      createdAt: new Date().toLocaleDateString(),
    },
  };
}

function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}

// const customerStore = createStore(customerReducer); //! so we don't do it like this
// customerStore.dispatch(createCustomer("John Na", "US"));
// customerStore.dispatch(updateName("Na John"));
// console.log(customerStore.getState());
// * remember that the store contains many reducer functions right, so we don't create many stores right

// * and to add many reducer functions to store we basically combine them to a rootReducer function and then pass in it to the createStore()
// * so to combine many reducer functions to the rootReducer we can use combineReducers function from redux
// * in the combineReducers we pass in an object with the key pair value so key is the name describe for that reducer and value is that reducer

const accountInitialState = {
  balance: 0,
  loan: 0,
  loadPurpose: "",
};

const accountReducer = function (state = accountInitialState, action) {
  const { type, payload } = action;
  const { balance, loan } = state;

  switch (type) {
    // case ACCOUNT_DEPOSIT: //* we also use this event name string variable in the reducer check type action like this
    case "account/deposit":
      return { ...state, balance: balance + payload };
    case "account/withdraw":
      return { ...state, balance: balance - payload };
    case "account/requestLoan":
      // const { amount, purpose } = payload;

      if (loan !== 0) return state;
      if (!payload.purpose) return state;

      return {
        ...state,
        loan: payload.amount,
        loadPurpose: payload.purpose,
        balance: balance + payload.amount,
      };
    case "account/payLoan":
      if (loan > balance) return state;

      return { ...state, loan: 0, loadPurpose: "", balance: balance - loan };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// * so basically with createStore, it always default that the reducer it gets always considered to be the root reducer
const store = createStore(rootReducer);

// ! but notice that here
// * Redux is smart and it can know what's reducer of that dispatch event string
// * so like account/requestLoan it knows that's account reducer, and customer/updateName it knows that's customer reducer
// ! but it doesn't based on that these event name string so account/requestLoan, customer/updateName...
// * so Redux does this in internally so behind the scenes and it know what's reducer for that dispatch event name string right and based on this info:
// const rootReducer = combineReducers({
//   account: accountReducer,
//   customer: customerReducer,
// });
// * so it will based on this info to know what's reducer for that event name string, so it doesn't do anything with account/requestLoan... these event name string
// * so these event name string like the convention and we can give it any name and Redux is not looking at these strings that's only for us as developers can understand what we're actually doing

store.dispatch(createCustomer("John Na", "US"));
store.dispatch(updateName("Na John"));
console.log(store.getState());

// ************************************ ACCOUNT REDUCER ************************************
// const accountInitialState = {
//   balance: 0,
//   loan: 0,
//   loadPurpose: "",
// };

// const accountReducer = function (state = accountInitialState, action) {
//   const { type, payload } = action;
//   const { balance, loan } = state;

//   switch (type) {
//     // case ACCOUNT_DEPOSIT: //* we also use this event name string variable in the reducer check type action like this
//     case "account/deposit":
//       return { ...state, balance: balance + payload };
//     case "account/withdraw":
//       return { ...state, balance: balance - payload };
//     case "account/requestLoan":
//       // const { amount, purpose } = payload;

//       if (loan !== 0) return state;
//       if (!payload.purpose) return state;

//       return {
//         ...state,
//         loan: payload.amount,
//         loadPurpose: payload.purpose,
//         balance: balance + payload.amount,
//       };
//     case "account/payLoan":
//       if (loan > balance) return state;

//       return { ...state, loan: 0, loadPurpose: "", balance: balance - loan };

//     default:
//       return state;
//   }
// };

// * create redux store from createStore method
// * this method has deprecated and nowadays we use another modern way to do it, but we can use it for exploring or learning purpose
// const store = createStore(accountReducer);

// * we can use dispatch method from store to dispatch action so this works like exactly in the dispatch function we use with useReducer hook
store.dispatch({ type: "account/deposit", payload: 600 });
store.dispatch({ type: "account/withdraw", payload: 300 });

store.dispatch({
  type: "account/requestLoan",
  payload: { amount: 900, purpose: "Buy a car for kid" },
});

store.dispatch({ type: "account/payLoan" });

// * getState method from store show us the current state (so all states in state management) in this store
// * we can also do something with this store to automatically show us the status of state in the screen and don't need to log but it's not necessary for us
// * because in the end we will also don't use it we will use another modern way with redux called redux toolkit but exploring the classic redux also help us to understand redux and master redux

console.log(store.getState());

//* ACTION CREATOR FUNCTIONS

// * we can create action creator function like this and it depends on our event action and based on that we write the fit code

function deposit(amount) {
  // * before that in redux some developers store the event action name string to a variable and put all of these variables into a separate corresponding with that reducer function
  // * for example here we can create:
  // const ACCOUNT_DEPOSIT = "account/deposit"; //* and then store it in the account file
  // * and then we use it in everywhere when we need this event action name string

  // * and it works just fine like before

  // * with we have a center place to manage all these names string event action, and then when we want to change we only change one in central place
  // * and it's also help reader can have the overall of this reducer function for account right
  // * and we also don't need to write the event name string many times right

  // ! but in the modern react we no longer use this, we have a modern way to do that
  // * but it's good to aware about it because we might work in the older code bases in the future and when we met it we can know what is it right
  // * so it's good to aware this way of assign the event name string to variables and put all of these variables in the central place a separate place

  return { type: "account/deposit", payload: amount };
  // return { type: ACCOUNT_DEPOSIT, payload: amount }; //* so like this
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}
function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(deposit(600));
console.log(store.getState());
store.dispatch(withdraw(300));
console.log(store.getState());
store.dispatch(requestLoan(1200, "To use it for work"));
console.log(store.getState());
store.dispatch(payLoan());
console.log(store.getState());
