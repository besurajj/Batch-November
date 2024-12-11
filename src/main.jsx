import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import { BookProvider } from "./context/BookContext";
import { LoginUserProvider } from "./context/LoginUser";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    refetchOnWindowFocus: false,
    queries: {
      onError: (error) => {
        console.error("Query Error:", error.message || error);
      },
    },
    mutations: {
      onError: (error) => {
        console.error(error);
      },
    },
  },
});

createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer
      limit={1}
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition:Bounce
    />
    <UserProvider>
      <BookProvider>
        <LoginUserProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </LoginUserProvider>
      </BookProvider>
    </UserProvider>
  </>
);
