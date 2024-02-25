// import React, { FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyles from "./styles/GlobalStyles";
import { Toaster } from "react-hot-toast";
import AppRoute from "./routes/AppRoute";
import DarkModeProvider from "./context/DarkModeContext";

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
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <AppRoute />
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
    </DarkModeProvider>
  );
}

export default App;
