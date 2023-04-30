import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./Footer/Footer";
import React, { useEffect } from "react";
import { GET_USER_PROFILE } from "../../redux";
import { ThemeContext } from "../../context/context";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
const Layout = (props) => {
  const { darkTheme } = useContext(ThemeContext);
  const auth = localStorage.getItem("auth");
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  // get user if there is user id
  const tokenExpiration = localStorage.getItem("tokenExpiration");

  if (tokenExpiration && new Date().getTime() > tokenExpiration) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("auth");
  }
  const { user, loading } = useSelector((state) => state.user_profile);
  useEffect(() => {
    if (auth === "true" && userId && token)
      dispatch(GET_USER_PROFILE(userId, token));
  }, []);

  return (
    <React.Fragment>
      <div
        style={
          darkTheme
            ? { backgroundColor: "#111926" }
            : { backgroundColor: "#fff" }
        }
      >
        <Header user={user} />
        <div style={{ minHeight: "70vh" }}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};
export default Layout;
