import { createSlice } from "@reduxjs/toolkit";

const customerInitialState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState: customerInitialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalId) {
        return {
          payload: {
            fullName,
            nationalId,
            createdAt: new Date().toLocaleDateString(),
          },
        };
      },

      reducer(state, action) {
        const {
          payload: { fullName, nationalId, createdAt },
        } = action;

        state.fullName = fullName;
        state.nationalId = nationalId;
        state.createdAt = createdAt;
      },
    },

    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;

export default customerSlice.reducer;
