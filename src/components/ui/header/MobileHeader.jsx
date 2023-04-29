import classes from "../../../styles/header.module.css";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

const MobileHeader = ({ open, handleClose, token }) => {
  const bgRef = useRef();
  const headerClasses = [classes.Mobile];
  const headerClass = [classes.Mobile, classes.CloseMobile];

  return (
    <header
      className={open ? headerClasses.join(" ") : headerClass.join(" ")}
      ref={bgRef}
      onClick={(e) => handleClose(e.target, bgRef.current)}
    >
      <aside>
        <main>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Video</li>
            <li>Books</li>
            <li>Consulting</li>
            <li>Contact Us</li>
          </ul>
        </main>
        {!token && (
          <section>
            <Link to="/sign-up" className={classes.SignUp}>
              Sign up
            </Link>
            <Link to="/sign-in" className={classes.SignIn}>
              Sign up
            </Link>
          </section>
        )}
      </aside>
    </header>
  );
};

export default MobileHeader;
