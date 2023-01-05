import React from "react";
import { Link, NavLink } from "react-router-dom";
import classes from "../../styles/header.module.css";
const Header = () => {
  return (
    <header className={classes.Header}>
      <div className={classes.Logo}>
        <span className={classes.SpecialLogo}>D-</span>
        <span className={classes.LogoName}>amiBloG</span>
      </div>

      <ul className={classes.HeaderLinks}>
        <li className={classes.HeaderLinkItem}>
          <NavLink to="/" className={classes.HeaderLink}>
            Home
          </NavLink>
        </li>
        <li className={classes.HeaderLinkItem}>
          <NavLink to="/video" className={classes.HeaderLink}>
            Video
          </NavLink>
        </li>
        <li className={classes.HeaderLinkItem}>
          <NavLink to="/books" className={classes.HeaderLink}>
            Books
          </NavLink>
        </li>
        <li className={classes.HeaderLinkItem}>
          <NavLink to="/consulting" className={classes.HeaderLink}>
            Consulting
          </NavLink>
        </li>
        <li className={classes.HeaderLinkItem}>
          <NavLink to="/about-us" className={classes.HeaderLink}>
            About Us
          </NavLink>
        </li>
      </ul>
      <div className={classes.HeaderContackLink}>
        <Link className={classes.ContactLink}>Contact</Link>
      </div>
      <div className={classes.Menu}>Menu</div>
    </header>
  );
};

export default Header;
