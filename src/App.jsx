import React, { useEffect } from "react";
import Auth from "./Auth/Auth.jsx";

import User from "./UserPanel/User.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainDashboard from "./UserPanel/MainDashboard.jsx";
import AddBook from "./components/AddBook.jsx";
import WhitelistUsers from "./components/WhitelistUsers.jsx";
import BookList from "./components/BookList.jsx";
import Signup from "./Auth/SignupUser.jsx";
import LoginUser from "./Auth/LoginUser.jsx";
import IssueBook from "./UserPanel/IssueBook.jsx";
import UserBook from "./UserPanel/UserBook.jsx";

import AllThingsHere from "./components/AllThingsHere.jsx";
import Payfine from "./UserPanel/Payfine.jsx";

import { AuthGuard, AdminAuth, PublicGuard } from "./Auth/AuthGuard.jsx";
// import { jwtToken } from "./constants/Constant.jsx";

function App() {
  //   useEffect(() => {
  //     AuthGuard();
  //   }, [jwtToken]);

  return (
    <Router>
      <Routes>
        {/* <Route element={<PublicGuard />}> */}
        <Route path="/" element={<LoginUser />} />
        <Route path="/Signup" element={<Signup />} />
        {/* </Route> */}
        {/* <Route path="/user-dashboard" element={<User />} /> */}

        <Route path="/not-authorized" element={<Auth />} />

        <Route element={<AdminAuth />}>
          <Route element={<MainDashboard />}>
            <Route path="/book-list" element={<BookList />} />
            <Route path="/user-list" element={<WhitelistUsers />} />
            <Route path="/admin-dashboard" element={<AllThingsHere />} />
            <Route path="/add-book" element={<AddBook />} />
          </Route>
        </Route>

        {/* <Route element={<AuthGuard />}> */}
          <Route element={<User />}>
            <Route path="/user-dashboard" element={<UserBook />} />
            <Route path="/pay-fine" element={<Payfine />} />
            <Route path="/issueBook" element={<IssueBook />} />
          </Route>
        {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
