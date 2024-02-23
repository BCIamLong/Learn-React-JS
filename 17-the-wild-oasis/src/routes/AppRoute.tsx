import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Bookings from "../pages/Bookings";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Account from "../pages/Account";
import Users from "../pages/Users";
import Cabins from "../pages/Cabins";
import Settings from "../pages/Settings";
import PageNotFound from "../pages/PageNotFound";
import AppLayout from "../layouts/AppLayout";
import Booking from "~/pages/Booking";
import CheckIn from "~/pages/CheckIn";
import LoginLayout from "~/layouts/LoginLayout";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoute() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
