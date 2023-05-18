import classes from "../../../styles/header.module.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { BsGithub, BsLinkedin, BsTwitter, BsGlobe } from "react-icons/bs";
import HandleInterface from "../../../Interface/HandleInterface";

interface PropTypes {
  open: boolean;
  token: string;
  socialHandles: HandleInterface[];
  darkTheme: boolean;
  handleClose: (e: any, target: any) => void;
}

const MobileHeader = (props: PropTypes) => {
  const { open, handleClose, token, socialHandles, darkTheme } = props;
  const bgRef = useRef<HTMLDivElement | null>(null);

  const headerClasses = [classes.Mobile];
  const headerClass = [classes.Mobile, classes.CloseMobile];

  const renderSocialLink = (handle: HandleInterface) => {
    let icon;
    if (handle.name === "github") icon = <BsGithub />;
    else if (handle.name === "twitter") icon = <BsTwitter />;
    else if (handle.name === "linkeldn") icon = <BsLinkedin />;
    else if (handle.name === "website") icon = <BsGlobe />;

    return (
      <a
        href={handle.url}
        target="_blank"
        key={handle._id}
        rel="noopener noreferrer"
      >
        {icon}
      </a>
    );
  };

  return (
    <header
      className={open ? headerClasses.join(" ") : headerClass.join(" ")}
      ref={bgRef}
      onClick={(e) => handleClose(e.target, bgRef.current)}
    >
      <aside style={!darkTheme ? { background: "#fff", color: "#111926" } : {}}>
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
              {socialHandles.map((handle: HandleInterface) =>
                renderSocialLink(handle)
              )}
            </div>
          </div>
        )}
      </aside>
    </header>
  );
};

export default MobileHeader;
