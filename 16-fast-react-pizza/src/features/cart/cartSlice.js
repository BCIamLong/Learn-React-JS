import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    updateItem(state, action) {
      state.cart = state.cart.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      );
    },
    incQuantity(state, action) {
      // way 1:
      state.cart = state.cart.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: item.unitPrice * (item.quantity + 1),
            }
          : item,
      );

      //way 2:
      const item = state.cart.find((item) => item.id === action.payload);

      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decQuantity(state, action) {
      // way 1:
      state.cart = state.cart.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              quantity: item.quantity - 1,
              totalPrice: item.unitPrice * (item.quantity - 1),
            }
          : item,
      );

      //way 2:
      const item = state.cart.find((item) => item.id === action.payload);

      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const { addItem, updateItem, deleteItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

// * and the convention and also the way Redux recommended that we should give the name of these selector callback functions with start with the get keyword
export const getTotalCartQuantity = (sum, item) => sum + item.quantity;
export const getTotalCartPrice = (sum, item) => sum + item.totalPrice;
