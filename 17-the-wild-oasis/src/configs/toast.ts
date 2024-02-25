export const toastOptions = {
  position: "top-center",
  gutter: 12,
  containerStyle: {
    margin: "8px",
    padding: "12px 18px",
    fontSize: "16px",
  },
  toastOptions: {
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
  },
};
