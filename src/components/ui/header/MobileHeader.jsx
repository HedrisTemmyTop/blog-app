import classes from "../../../styles/header.module.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { BsGithub, BsLinkedin, BsTwitter, BsGlobe } from "react-icons/bs";

const MobileHeader = ({
  open,
  handleClose,
  token,
  socialHandles,
  darkTheme,
}) => {
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
              Sign in
            </Link>
          </section>
        )}

        {socialHandles && (
          <div>
            <div
              className={
                darkTheme ? classes.SocialLinksDark : classes.SocialLinksLight
              }
            >
              {socialHandles.map((handle) => {
                if (handle.name === "github")
                  return (
                    <a href={handle.url} target="_blank">
                      <BsGithub />
                    </a>
                  );
                if (handle.name === "twitter")
                  return (
                    <a href={handle.url} target="_blank">
                      <BsTwitter />
                    </a>
                  );
                if (handle.name === "linkeldn")
                  return (
                    <a href={handle.url} target="_blank">
                      <BsLinkedin />
                    </a>
                  );
                if (handle.name === "website")
                  return (
                    <a href={handle.url} target="_blank">
                      <BsGlobe />
                    </a>
                  );
              })}
            </div>
          </div>
        )}
      </aside>
    </header>
  );
};

export default MobileHeader;
