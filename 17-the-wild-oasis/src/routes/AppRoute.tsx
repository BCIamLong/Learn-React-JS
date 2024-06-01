import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import SpinnerScreen from "~/components/SpinnerScreen";
// import SpinnerScreen from "~/components/SpinnerScreen";

// import Bookings from "../pages/Bookings";
// import Dashboard from "../pages/Dashboard";
// import Login from "../pages/Login";
// import Account from "../pages/Account";
// import Users from "../pages/Users";
// import Cabins from "../pages/Cabins";
// import Settings from "../pages/Settings";
// import PageNotFound from "../pages/PageNotFound";
// import Booking from "~/pages/Booking";
// import CheckIn from "~/pages/CheckIn";
// import AppLayout from "../layouts/AppLayout";
// import LoginLayout from "~/layouts/LoginLayout";

const Bookings = lazy(() => import("../pages/Bookings"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Login = lazy(() => import("../pages/Login"));
const Account = lazy(() => import("../pages/Account"));
const Users = lazy(() => import("../pages/Users"));
const Cabins = lazy(() => import("../pages/Cabins"));
const Settings = lazy(() => import("../pages/Settings"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const Booking = lazy(() => import("../pages/Booking"));
const CheckIn = lazy(() => import("../pages/CheckIn"));
const AppLayout = lazy(() => import("../layouts/AppLayout"));
const LoginLayout = lazy(() => import("../layouts/LoginLayout"));

export default function AppRoute() {
  return (
    <BrowserRouter>
      {/* <Suspense> */}
      <Suspense fallback={<SpinnerScreen />}>
        <Routes>
          {/* <Route index element={<Login />} /> */}
          {/* so build index route with redirect to the certain page is cleaner right instead / we have /login
           * so if the url is / and page is login it might not clean and might cause some confusing right
           */}
          {/* <Route index element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/account" element={<Account />} />
            <Route path="/users" element={<Users />} />
            <Route path="/cabins" element={<Cabins />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<PageNotFound />} /> */}

          {/* we can also don't need to use / notation because by default Vite did all of that */}

          <Route index element={<Navigate replace to="/dashboard" />} />
          <Route element={<LoginLayout />}>
            <Route path="login" element={<Login />} />
          </Route>

          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="account" element={<Account />} />
            <Route path="users" element={<Users />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="bookings/:bookingId" element={<Booking />} />
            <Route path="check-in/:bookingId" element={<CheckIn />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
