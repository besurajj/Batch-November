import React, { createContext, useState } from "react";
import axios from "axios";
import { apiUrl } from "../constants/Constant";
// Create Context
export const LoginUserContext = createContext();

// Provider Component
export const LoginUserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const [message, setMessage] = useState("");

  const loginUser = async () => {
    try {
      const response = await axios.post(`http://${apiUrl}/users/login`, {
        email: userDetails.email,
        password: userDetails.password,
      });

      // return response.data
      if (response.status === 200) {
        setError(false);
        // console.log("response data ........", response.data);
        setMessage(response.data.message);
        // console.log(response.data.isAdmin);
        localStorage.setItem("token", response?.data.token);
        localStorage.setItem("isAdmin", response?.data.isAdmin);
        // console.log(localStorage.getItem("isAdmin"));
        // localStorage.setItem("userId", response?.data?.id);
        // setJwtToken(response.data.token);
        return { success: true, message: "Login successful!" };
      }
      return { success: false, message: "Unexpected status code." };
    } catch (err) {
      setError(true);
      setMessage("Login failed. Check credentials.");
      console.error("Error:", err.message);
      return { success: false, message: "Login failed." };
    }
  };

  return (
    <LoginUserContext.Provider
      value={{
        userDetails,
        setUserDetails,
        message,
        loginUser,
        error,
      }}
    >
      {children}
    </LoginUserContext.Provider>
  );
};
