import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./Footer/Footer";
import React, { useEffect } from "react";
import { GET_USER_PROFILE } from "../../redux";
import { ThemeContext } from "../../context/context";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "../alertMessage/alertMessage";
const Layout = () => {
  const { darkTheme } = useContext(ThemeContext);
  const auth = localStorage.getItem("auth");
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const data = localStorage.getItem("data");
  // get user if there is user id
  const tokenExpiration = localStorage.getItem("tokenExpiration");

  if (tokenExpiration && new Date().getTime() > tokenExpiration) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("auth");
    localStorage.removeItem("data");
  }
  const { user, error } = useSelector((state) => state.user_profile);
  useEffect(() => {
    if (auth === "true" && userId && token) {
      if (data) {
        const userInfo = JSON.parse(data);
        if (
          userInfo.username &&
          userInfo.uid &&
          userInfo.profileImage &&
          userInfo.firstname &&
          userInfo.lastname
        )
          return;

        dispatch(GET_USER_PROFILE(userId, token));
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      const data = {
        username: user.user.username,
        profileImage: user.user.profileImage,
        lastname: user.user.lastname,
        firstname: user.user.firstname,
        uid: user.user._id,
      };
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, [user]);

  useEffect(() => {
    if (error?.response?.data === "Unauthorized") {
      setTimeout(() => {
        window.location = "/sign-in";
      }, 5000);
    }
  }, [error]);

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
      <AlertMessage duration={4000} />
    </React.Fragment>
  );
};
export default Layout;
