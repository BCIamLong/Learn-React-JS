const accountInitialState = {
  balance: 0,
  loan: 0,
  loadPurpose: "",
};

export default function accountReducer(state = accountInitialState, action) {
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
}

export function deposit(amount) {
  return { type: "account/deposit", payload: amount };
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
