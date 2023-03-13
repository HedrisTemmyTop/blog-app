import React from "react";
import { Link, NavLink } from "react-router-dom";
import classes from "../../styles/header.module.css";
import userImg from "../../assets/Ellipse.png";
import downIcon from "../../assets/Vector2.png";
import { ThemeContext } from "../../context/context";
import { useContext } from "react";
import lightIconDown from "../../assets/VectorLight.png";
const Header = ({ props }) => {
  const auth = localStorage.getItem("auth");
  const darkTheme = useContext(ThemeContext);

  return (
    <header
      className={
        darkTheme
          ? [classes.Header, classes.HeaderDark].join(" ")
          : [classes.Header, classes.HeaderLight].join(" ")
      }
    >
      <div className={classes.Logo}>
        <span className={classes.SpecialLogo}>D-</span>
        <span className={darkTheme ? classes.LogoName : classes.LogoNameLight}>
          amiBloG
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
      {auth === "true" ? (
        <Link
          to="/profile"
          className={[
            classes.User,
            darkTheme ? classes.UserDark : classes.UserLight,
          ].join(" ")}
        >
          {" "}
          <img
            src={userImg}
            alt="user display picture"
            className={classes.userImg}
          />
          <div className={classes.UserName}>HedrisTemmyTop</div>
          {darkTheme ? (
            <img src={downIcon} />
          ) : (
            <img src={lightIconDown} alt="light icon down" />
          )}
        </Link>
      ) : (
        <div className={classes.HeaderContackLink}>
          <Link className={classes.ContactLink} to="/sign-up">
            Sign up
          </Link>
        </div>
      )}

      <div className={classes.Menu}>Menu</div>
    </header>
  );
};

export default Header;
