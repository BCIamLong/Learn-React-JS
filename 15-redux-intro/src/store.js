import { thunk } from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// * so to all Redux understand the middleware function we need to use the applyMiddleware in the second params of the createStore, and passing the middleware function type which is in this case thunk
// * thunk is popular when we handle the asynchronous related to HTTP requests, API call... or something like that

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
