import { Outlet, redirect, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../Footer/Footer";
import React, { useEffect } from "react";
import axios from "axios";

const Layout = (props) => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("auth");
  useEffect(() => {
    if (auth !== "true") {
      navigate("/sign-inp");
    }
  }, []);
  console.log(auth);
  return auth ? (
    <React.Fragment>
      <Header />
      <Outlet />
      <Footer />
    </React.Fragment>
  ) : null;
};
export default Layout;
