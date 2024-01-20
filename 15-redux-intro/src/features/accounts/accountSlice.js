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

    payLoan(state, action) {
      if (state.loan > state.balance) return;

      state.balance -= state.loan;
      state.loadPurpose = "";
      state.loan = 0;
    },
  },
});

export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;
