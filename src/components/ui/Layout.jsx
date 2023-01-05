import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../Footer/Footer";
import React from "react";
const Layout = () => {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
