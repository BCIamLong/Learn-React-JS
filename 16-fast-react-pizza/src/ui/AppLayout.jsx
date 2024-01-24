import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  console.log(navigation);
  const isLoading = navigation.state === "loading";

  // * we have layout for all pages with header, CartOverview is fixed and the main content is the only thing will change across when the url change
  // * so we have the layout with Header and CartOverview  and in main content we can have Cart, Menu, Homepage...
  return (
    <div>
      {/* we can also put this loader here and then later on we can style it better like the absolute position to display it better */}
      {isLoading && <Loader />}
      <Header />
      <main>
        {/* * we use Outlet component to render the element we get from the child route in nested route */}
        <Outlet />
        {/* {isLoading ? <Loader /> : <Outlet />} */}
      </main>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
