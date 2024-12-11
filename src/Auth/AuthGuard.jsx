import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { token, isAdmin } from "../constants/Constant";
// console.log(isAdmin);
const AuthGuard =  () => {
  // console.log("this is jwt token ", token);
  // console.log("this is admin value ", isAdmin);
  const isUser = token && isAdmin === "false";

  return isUser ? <Outlet /> : <Navigate to={"/"} />;
};

const AdminAuth = () => {
  const adminCred = token && isAdmin === "true";
  return adminCred ? <Outlet /> : <Navigate to={"/"} />;
};

const PublicGuard = () => {
  return !token ? <Navigate to={"/"} /> : <Outlet />;
};

export { AdminAuth, AuthGuard, PublicGuard };

