import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./ui/Home";
import Cart from "./features/cart/Cart";
import Menu from "./features/menu/Menu";
import CreateOrder from "./features/order/CreateOrder";
import Order from "./features/order/Order";

//* https://reactrouter.com/en/main/routers/create-browser-router

// * this is a new way to create new router so we use the createBrowserRouter instead in traditional way we use BrowserRouter component right
// * son this createBrowserRouter we will accept an array contains many objects and each object is one route and in object to declare route we use path and element option
// * path for the url path, and  element for the component we will render when we come to this route

// ! one thing notice: that the traditional way also works just fine with modern react but it will not be able to duel with API like fetching data from API

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/menu",
    element: <Menu />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/order/new",
    element: <CreateOrder />,
  },
  {
    path: "/order/:orderId",
    element: <Order />,
  },
  // ? so here we still handle for the page not found so for the unknown route with unknown link right
  // * so before in our traditional way we use the route with * notation and catch all the unknown routes and return the page not found component right
  // * but with the new way to create router we don't need to do that because we will have a special way of handling errors
]);

// * so we can see it looks like the traditional way right if we look the traditional way we also see it has many common points but it's different syntax to declare
// * but with this new way we will be able to fetch data from API, and with this new way we can use the new power powerful apis like data loaders, data actions, data fetchers

function App() {
  // * and then we provide our router to our router provider component
  // * so this RouterProvider get our router and then present our routers based on our router variable we just created
  return <RouterProvider router={router} />;
}

export default App;
