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

      // * and so when we decrease the item quantity to 0 we will delete this so this is very common feature in the shopping cart allow user also delete the item instead use click the delete button right
      // * and so we can use the same logic of the deleteItem reducer so we can copy the logic and paste right here but we can reuse this reducer function by use a nice trick
      // *cartSlice.caseReducers.deleteItem(state, action);
      // * so we can use cartSlice.caseReducers to access to our reducers and pass in it with the same state and action we get right here and it will work just fine
      // ! notice because this decQuantity reducer function also take the payload is an id and therefore it can work in this way right because deleteItem reducer function also require payload is an item id right
      // ! and therefore if we use deleteItem reducer like in the clearCart it will not work anymore
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
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
