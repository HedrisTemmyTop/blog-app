import { Outlet, useParams } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./Footer/Footer";
import React, { useEffect } from "react";
import { GET_USER_PROFILE } from "../../redux";
import { ThemeContext } from "../../context/context";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "../alertMessage/alertMessage";
import { UserProfileTypes } from "../../Interface/ProfileInterface";

interface ThemeContextValue {
  darkTheme: boolean;
  toggleThemeContext: () => void;
}

const Layout = () => {
  const { darkTheme } = useContext<ThemeContextValue>(ThemeContext);
  const { id } = useParams();

  const auth: boolean = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth")!)
    : false;

  const dispatch: any = useDispatch();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const data = localStorage.getItem("data");
  // get user if there is user id
  const expTokenString: string | null = localStorage.getItem("tokenExpiration");

  const tokenExpiration: number = expTokenString
    ? JSON.parse(expTokenString)
    : 1000;

  if (tokenExpiration && new Date().getTime() > tokenExpiration) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("auth");
    localStorage.removeItem("data");
  }
  const { user, error } = useSelector(
    (state: UserProfileTypes) => state.user_profile
  );
  useEffect(() => {
    if (auth && userId && token) {
      if (data) {
        const userInfo = JSON.parse(data);
        if (
          userInfo.username &&
          userInfo.uid &&
          userInfo.firstname &&
          userInfo.lastname &&
          userInfo.socialHandles
        ) {
          return;
        } else {
          dispatch(GET_USER_PROFILE(userId, token));
        }
      } else dispatch(GET_USER_PROFILE(userId, token));
    }
  }, []);

  useEffect(() => {
    if (user) {
      const data = {
        username: user.user.username,
        profileImage: user.user.profileImage ? user.user.profileImage : "",
        lastname: user.user.lastname,
        firstname: user.user.firstname,
        uid: user.user._id,
        socialHandles: user.user.socialHandle,
      };
      if (id === userId || !data || !id || user.user._id !== data.uid)
        localStorage.setItem("data", JSON.stringify(data));
    }
  }, [user]);

  useEffect(() => {
    if (error?.response?.data === "Unauthorized") {
      setTimeout(() => {
        let location: Location = window.location;
        location.href = "/sign-in";
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
        <div style={{ minHeight: "50vh" }}>
          <Outlet />
        </div>
        <Footer />
      </div>
      <AlertMessage duration={4000} />
    </React.Fragment>
  );
};
export default Layout;
