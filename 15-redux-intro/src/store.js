import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

// * so with Redux toolkit (RTK) we have out of the box the Redux development tools like redux-thunk, redux devtools...
// * and we also have out of the box with some boilerplate code like we don't need to write action creator...

// * and to create store all we need is use the configureStore from Redux toolkit and the call it and pass in the options object
// * and in this option object we can use the reducer property so basically the root reducer and in here as we did before we pass in all the reducers we have with key-value pair so key is the name make sense and value is that reducer

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

// * so like this and now we have store we don't need to set the middleware with thunk or set devtools because it happens automatically
// * and now everything works just fine because classic Redux and Redux toolkit compatible (tuong thich) 100% and so therefore we can convert classic Redux to Redux toolkit step by step so gradually (dan dan) and don't worry about compatible
// * and Redux toolkit also help us write the state slices so basically accountSlice and customerSlice and with Redux toolkit we can write this entire logic of the classic Redux to Redux toolkit with a different way

export default store;
