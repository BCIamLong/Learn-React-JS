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
export const getTotalCartQuantity = (store) =>
  store.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (store) =>
  store.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCart = (store) => store.cart.cart;

// * we can get this current quantity to show the button so delete button or add to cart button so the ideal that when user click add to cart
// * then the item is added to cart => now we can display the delete button and user now that this item is already in users cart and they can delete this from here if they want
// * so they can delete in the menu page not need to go to the cart page to delete

// * so because this selector call back function now need a param and that's id right and therefore we need to accept the function with have param id and then return the function which is exactly the selector callback function type right
export const getCurrentQuantityById = (id) => (store) =>
  store.cart.cart.find((item) => item.id === id)?.quantity ?? 0;
