const accountInitialState = {
  balance: 0,
  loan: 0,
  loadPurpose: "",
  // currencyTarget: "USD",
  isLoading: false,
};

export default function accountReducer(state = accountInitialState, action) {
  const { type, payload } = action;
  const { balance, loan } = state;

  switch (type) {
    // case ACCOUNT_DEPOSIT: //* we also use this event name string variable in the reducer check type action like this
    case "account/loading":
      return { ...state, isLoading: true };
    case "account/deposit":
      return { ...state, balance: balance + payload, isLoading: false };
    case "account/withdraw":
      if (payload > balance) return;

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
}

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  // * this function middleware here can access to dispatch function and getState method to show state info
  return async function (dispatch, getState) {
    dispatch({ type: "account/loading" });

    //* this is where we do the API call so asynchronous task
    // * when we return a function Redux will know this is the middleware so the thunk to do the asynchronous task
    // * we can use API call to convert amount from this current to USD
    // *https://www.frankfurter.app/docs/#conversion
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const convertedAmount = data.rates.USD;

    // return { type: "account/deposit", payload: convertedAmount }; //* actually we don't return
    dispatch({ type: "account/deposit", payload: convertedAmount }); //* but we use dispatch function
  };
}
export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}
export function payLoan() {
  return { type: "account/payLoan" };
}
