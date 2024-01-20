const customerInitialState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};
export default function customerReducer(state = customerInitialState, action) {
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
}

export function createCustomer(fullName, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName,
      nationalId,
      createdAt: new Date().toLocaleDateString(),
    },
  };
}

export function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}
