import { Outlet, redirect, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../Footer/Footer";
import React, { useEffect } from "react";
import axios from "axios";
import { ThemeContext } from "../../context/context";
import { useContext } from "react";
const Layout = (props) => {
  const auth = localStorage.getItem("auth");
  const darkTheme = useContext(ThemeContext);
  console.log(darkTheme);
  // useEffect(() => {
  //   // if (auth !== "true") {
  //   //   navigate("/sign-in");
  //   // }
  // }, []);
  console.log(auth);
  return (
    <React.Fragment>
      <div
        style={
          darkTheme
            ? { backgroundColor: "#111926" }
            : { backgroundColor: "#fff" }
        }
      >
        <Header />
        <Outlet />
        <Footer />
      </div>
    </React.Fragment>
  );
};
export default Layout;
