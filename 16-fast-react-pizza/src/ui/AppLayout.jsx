import { Outlet, useNavigation } from 'react-router-dom';
import Header from './Header';
import CartOverview from '../features/cart/CartOverview';
import Loader from './Loader';
import { Provider } from 'react-redux';
import store from '../store';

function AppLayout() {
  const navigation = useNavigation();
  // console.log(navigation);
  const isLoading = navigation.state === 'loading';

  // * we have layout for all pages with header, CartOverview is fixed and the main content is the only thing will change across when the url change
  // * so we have the layout with Header and CartOverview  and in main content we can have Cart, Menu, Homepage...
  return (
    <Provider store={store}>
      <div className={`grid h-screen grid-rows-[auto_1fr_auto] `}>
        {/* we can also put this loader here and then later on we can style it better like the absolute position to display it better */}
        {isLoading && <Loader />}
        {/* <Loader /> */}
        <Header />

        <main className="mx-auto h-full w-full max-w-5xl overflow-auto">
          {/* * we use Outlet component to render the element we get from the child route in nested route */}
          <Outlet />
          {/* {isLoading ? <Loader /> : <Outlet />} */}
        </main>

        <CartOverview />
      </div>
    </Provider>
  );
}

export default AppLayout;
