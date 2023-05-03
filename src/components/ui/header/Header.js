import React from "react";
import { Link, NavLink } from "react-router-dom";
import classes from "../../../styles/header.module.css";
import defaultImage from "../../../assets/default_img.png";
import downIcon from "../../../assets/Vector2.png";
import { ThemeContext } from "../../../context/context";
import { useContext } from "react";
import lightIconDown from "../../../assets/VectorLight.png";
import { SlMenu } from "react-icons/sl";
import { BsSun, BsMoon } from "react-icons/bs";
import AlertMessage from "../../alertMessage/alertMessage";
import { CiEdit } from "react-icons/ci";
import UserNav from "./UserNav";
import { useState, useEffect } from "react";
import MobileHeader from "./MobileHeader";
import { toast } from "react-toastify";
const Header = ({ user }) => {
  const { darkTheme, toggleThemeContext } = useContext(ThemeContext);
  const [showUserNav, setShowUserNav] = useState(false);
  const [open, setOpen] = useState(false);
  const [logout, setLogout] = useState(false);
  const token = localStorage.getItem("token");

  const data = JSON.parse(localStorage.getItem("data"));

  console.log(user);
  useEffect(() => {
    if (logout) {
      toast.success("Logout successfull 😥😏😪😫", {
        autoClose: 1700,
        toastId: "toast-success",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    }
  }, [logout]);

  const handleLogout = () => {
    setLogout(true);
    localStorage.clear();
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = (clicked, bg) => {
    if (clicked === bg) setOpen(false);
  };
  return (
    <>
      <AlertMessage duration={2000} />
      <header
        className={
          darkTheme
            ? [classes.Header, classes.HeaderDark].join(" ")
            : [classes.Header, classes.HeaderLight].join(" ")
        }
      >
        <div className={classes.Left}>
          <div
            className={classes.Menu}
            style={darkTheme ? { color: "#fff" } : { color: "#111926" }}
          >
            <SlMenu onClick={handleOpen} />
          </div>
          <Link className={classes.Logo} to="/">
            <span className={classes.SpecialLogo}>F</span>
            <span
              className={
                darkTheme ? classes.LogoNameDark : classes.LogoNameLight
              }
            >
              enkei
            </span>
          </Link>
        </div>

        <ul className={classes.HeaderLinks}>
          <li className={classes.HeaderLinkItem}>
            <NavLink
              to="/"
              className={
                darkTheme ? classes.HeaderLinkDark : classes.HeaderLinkLight
              }
            >
              Home
            </NavLink>
          </li>
          <li className={classes.HeaderLinkItem}>
            <NavLink
              to="/video"
              className={
                darkTheme ? classes.HeaderLinkDark : classes.HeaderLinkLight
              }
            >
              Video
            </NavLink>
          </li>
          <li className={classes.HeaderLinkItem}>
            <NavLink
              to="/books"
              className={
                darkTheme ? classes.HeaderLinkDark : classes.HeaderLinkLight
              }
            >
              Books
            </NavLink>
          </li>
          <li className={classes.HeaderLinkItem}>
            <NavLink
              to="/consulting"
              className={
                darkTheme ? classes.HeaderLinkDark : classes.HeaderLinkLight
              }
            >
              Consulting
            </NavLink>
          </li>
          <li className={classes.HeaderLinkItem}>
            <NavLink
              to="/about-us"
              className={
                darkTheme ? classes.HeaderLinkDark : classes.HeaderLinkLight
              }
            >
              About Us
            </NavLink>
          </li>
        </ul>
        {data || user ? (
          <span
            // to={"/profile/" + userId}
            className={[
              classes.User,
              darkTheme ? classes.UserDark : classes.UserLight,
            ].join(" ")}
          >
            <Link to="/post-blog">
              <button className={classes.WriteBtn}>
                <span>Write</span>
                <CiEdit className={classes.Write} />
              </button>
            </Link>
            {data || user ? (
              <div className="mode">
                {darkTheme ? (
                  <BsMoon onClick={toggleThemeContext} />
                ) : (
                  <BsSun className="sun" onClick={toggleThemeContext} />
                )}
              </div>
            ) : (
              <div className="mode">
                {darkTheme ? (
                  <BsMoon onClick={toggleThemeContext} />
                ) : (
                  <BsSun className="sun" onClick={toggleThemeContext} />
                )}
              </div>
            )}
            <div
              className={classes.UserContainer}
              onClick={() => setShowUserNav((prev) => !prev)}
            >
              {showUserNav && (
                <UserNav
                  id={data ? data?.uid : user ? user.user._id : ""}
                  click={handleLogout}
                  userImage={
                    data
                      ? data.profileImage
                      : user.user.profileImage
                      ? user.user.profileImage
                      : defaultImage
                  }
                  username={
                    data ? data.username : user ? user.user.username : ""
                  }
                  lastname={
                    data ? data.lastname : user ? user.user.firstname : ""
                  }
                  firstname={
                    data ? data.firstname : user ? user.user.firstname : ""
                  }
                />
              )}

              <img
                src={
                  data
                    ? data?.profileImage
                    : user.user.profileImage
                    ? user.user.profileImage
                    : defaultImage
                }
                alt="user-dp"
                className={classes.userImg}
              />
              <div className={classes.UserName}>
                {data ? data?.username : user ? user.user.username : ""}
              </div>
              {darkTheme ? (
                <img src={downIcon} alt="icon" className={classes.IconDown} />
              ) : (
                <img
                  src={lightIconDown}
                  alt="light icon down"
                  className={classes.IconDown}
                />
              )}
            </div>
          </span>
        ) : (
          <div className={classes.RightSection}>
            <div className="mode" style={darkTheme ? { color: "#fff" } : null}>
              {darkTheme ? (
                <BsMoon onClick={toggleThemeContext} />
              ) : (
                <BsSun className="sun" onClick={toggleThemeContext} />
              )}
            </div>
            <div className={classes.HeaderContackLink}>
              <Link className={classes.ContactLink} to="/sign-up">
                Sign up
              </Link>
            </div>
          </div>
        )}
        <MobileHeader
          open={open}
          handleClose={handleClose}
          token={token}
          socialHandles={user?.user?.socialHandle && user.user.socialHandle}
          darkTheme={darkTheme}
        />
      </header>
    </>
  );
};

export default Header;
