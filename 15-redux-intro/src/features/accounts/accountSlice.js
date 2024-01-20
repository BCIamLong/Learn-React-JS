import { createSlice } from "@reduxjs/toolkit";

const accountInitialState = {
  balance: 0,
  loan: 0,
  loadPurpose: "",
  // currencyTarget: "USD",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState: accountInitialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },

    withdraw(state, action) {
      const { payload } = action;

      if (state.balance < payload) return;

      state.balance -= payload;
    },

    //* way 1: we need some configurations here to make it works by follow the rules of Redux toolkit
    requestLoan: {
      prepare(amount, purpose) {
        // * so this function here prepare the payload based on the arguments we get then return to the reducer function bellow in the action
        // * so basically we prepare the payload in action

        return {
          payload: { amount, purpose },
        };
      },

      reducer(state, action) {
        // * like before in the reducer function we code logic to update state
        // * we can think that it's reducer of one case in switch case we had before of reducer function in the classic old Redux and also useReducer hook
        console.log(action);
        if (state.loan > 0) return;

        const {
          payload: { amount, purpose },
        } = action;

        // * notice this logic because now we are mutating state and state will be change notice we need to sort the order must be logical way
        // * with logical way the state can update as we expected so notice the order it can create some errors or strange behaviors
        state.loan = amount;
        state.balance += amount;
        state.loadPurpose = purpose;
      },
    },

    // requestLoan(state, action) { //* way 2
    //   console.log(action);
    //   if (state.loan > 0) return;

    //   const {
    //     payload: { amount, purpose },
    //   } = action;

    //   state.loan = amount;
    //   state.balance += amount;
    //   state.loadPurpose = purpose;
    // },

    payLoan(state) {
      if (state.loan > state.balance) return;

      state.balance -= state.loan;
      state.loadPurpose = "";
      state.loan = 0;
    },

    // * we also need to create new action creator loading or convertingCurrency
    // loading(state, action) {
    // * if we don't need to access to the action or we don't have a payload we can don't write it
    loading(state) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

// * so now we implementing thunk in the deposit with the classic Redux way, because implement thunk with Redux toolkit need some step and we will do it later in the next project

// * but for now just use the classic way and of course it works just fine but remember that keep the account/deposit event action string here must be the shape right here
// * because only that the Redux toolkit can know this is action creator
// * and the name function deposit must also like account/ after right here so deposit

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
    const convertedAmount = data?.rates?.USD;

    // return { type: "account/deposit", payload: convertedAmount }; //* actually we don't return
    dispatch({ type: "account/deposit", payload: convertedAmount }); //* but we use dispatch function
  };
}

export default accountSlice.reducer;
