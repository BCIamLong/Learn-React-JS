import { Outlet } from "react-router-dom";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";

function AppLayout() {
  // * we have layout for all pages with header, CartOverview is fixed and the main content is the only thing will change across when the url change
  // * so we have the layout with Header and CartOverview  and in main content we can have Cart, Menu, Homepage...
  return (
    <div>
      <Header />

      <main>
        {/* * we use Outlet component to render the element we get from the child route in nested route */}
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
