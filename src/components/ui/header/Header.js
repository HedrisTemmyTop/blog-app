import React from "react";
import { Link, NavLink } from "react-router-dom";
import classes from "../../../styles/header.module.css";
import userImg from "../../../assets/Ellipse.png";
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
const Header = ({ user }) => {
  const { darkTheme, toggleThemeContext } = useContext(ThemeContext);
  const [showUserNav, setShowUserNav] = useState(false);
  const [open, setOpen] = useState(false);
  const [logout, setLogout] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log(logout);
    if (logout) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
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
    <header
      className={
        darkTheme
          ? [classes.Header, classes.HeaderDark].join(" ")
          : [classes.Header, classes.HeaderLight].join(" ")
      }
    >
      {logout && (
        <AlertMessage
          bgColor="success"
          message="Loggout successfull"
          duration={2000}
        />
      )}
      <div
        className={classes.Menu}
        style={darkTheme ? { color: "#fff" } : { color: "#908f8f1f" }}
      >
        <SlMenu onClick={handleOpen} />
      </div>
      <div className={classes.Logo}>
        <span className={classes.SpecialLogo}>F</span>
        <span
          className={darkTheme ? classes.LogoNameDark : classes.LogoNameLight}
        >
          enkei
        </span>
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
      {user ? (
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
          {user ? (
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
            {showUserNav && <UserNav id={user.user._id} click={handleLogout} />}

            <img
              src={userImg}
              alt="user display picture"
              className={classes.userImg}
            />
            <div className={classes.UserName}>
              {user ? user.user.username : ""}
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
        <>
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
        </>
      )}
      <MobileHeader open={open} handleClose={handleClose} token={token} />
    </header>
  );
};

export default Header;
