// import React, { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Users from "./pages/Users";
import Cabins from "./pages/Cabins";
import Settings from "./pages/Settings";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./layouts/AppLayout";
import GlobalStyles from "./styles/GlobalStyles";
import Bookings from "./pages/Bookings";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
      // *https://stackoverflow.com/questions/72828361/what-are-staletime-and-cachetime-in-react-query
      // *https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults
    },
  },
});

// interface AppProps {}
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
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

          <Route index element={<Navigate replace to="/login" />} />
          <Route path="login" element={<Login />} />
          <Route element={<AppLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="account" element={<Account />} />
            <Route path="users" element={<Users />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{
          margin: "8px",
          padding: "12px 18px",
          fontSize: "16px",
        }}
        toastOptions={{
          success: {
            duration: 3000,
            iconTheme: {
              primary: "var(--color-green-700)",
              secondary: "var(--color-grey-0)",
            },
            style: {
              color: "var(--color-green-700)",
              maxWidth: "600px",
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: "var(--color-red-700)",
              secondary: "var(--color-grey-0)",
            },
            style: {
              color: "var(--color-red-700)",
              maxWidth: "600px",
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
