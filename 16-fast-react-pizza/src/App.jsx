import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './ui/Home';
import Cart from './features/cart/Cart';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder';
import Order, { loader as orderLoader } from './features/order/Order';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';
import { action as updateOrderAction } from './features/order/UpdateOrder';
import Login from './ui/Login';
import LoginLayout from './ui/LoginLayout';

//* https://reactrouter.com/en/main/routers/create-browser-router

// * this is a new way to create new router so we use the createBrowserRouter instead in traditional way we use BrowserRouter component right
// * son this createBrowserRouter we will accept an array contains many objects and each object is one route and in object to declare route we use path and element option
// * path for the url path, and  element for the component we will render when we come to this route

// ! one thing notice: that the traditional way also works just fine with modern react but it will not be able to duel with API like fetching data from API

const router = createBrowserRouter([
  // * to declare the nested routes in a new way of create router
  // * we use children option
  {
    element: <AppLayout />,
    // * and we pass all child routes of this route inside this parent AppLayout route
    // * so basically all the routes the pages will be layout so AppLayout and in AppLayout it will take the element of these child route and change in the main content
    // * so basically it works like before with the traditional way to create route right but the different that's syntax and also the type of layout
    // * here this layout is for all pages and for all routes and in react router context we can say this is layout routes
    // * before in the world wise app we have AppLayout for change the cities and the county list right so it's only small range layout only for two components and outside of this layout we also have another route
    // * but here we do it for all our routes for our page right and in this layout it's layout for all routes and for all pages so therefore it doesn't have any route outside right
    // * and in traditional we have index route right and by default it's the route for the AppLayout but in this way of create router it might be a / so the homepage
    errorElement: <Error />,
    // * we can put the errorElement in the parent like global error and the error from child routes in loader when the error throw it can be bubble up to parent
    // * and we will catch it here in the parent and then handle that so like global error right
    // ! also notice that the errors might happen in the loader so if the route doesn't have loader and doesn't duel with any data fetching API there is no error at all right
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        // * in the step 2 we provide loader with the loader property on the route object
        loader: menuLoader,
        errorElement: <Error />,
        // * we can also put the error here to handle for only menu route
        // * and in this case that make sense because now we only have the menu route has loader and fetching data from API right
        // * also if we catch error here it will handle inside this menu route so it will not bubble up to parent because we catch it right here in the menu route so in the child route right
        // ! notice that when we catch in the child route it will get the layout of this page but if it's error catch by parent maybe we need to create new layout for error right
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
        // * so we connect the action function to this route here, and then when we get the post request from the form of this route it will call this createOrderAction function
        action: createOrderAction,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
    ],
  },
  {
    element: <LoginLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
    ],
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
