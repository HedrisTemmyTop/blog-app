import { Link } from "react-router-dom";
import classes from "../../../styles/Footer.module.css";
import { IoLogoLinkedin, IoLogoWhatsapp, IoLogoTwitter } from "react-icons/io";
const Footer = () => {
  return (
    <footer className={classes.Footer}>
      <aside className={classes.Aside}>
        <div className={classes.Logo}>
          <span>F</span>
          <span>ENKEI</span>
        </div>
        <div className={classes.Social}>
          <div>Lets connect</div>
          <span className={classes.SocialIcons}>
            <a href="https://twitter.com/HedrisTemmyTop" target="_blank">
              <IoLogoTwitter className={classes.Icons} />
            </a>
            <a href="https://wa.me/message/O6DEBLNSZ4HTM1" target="_blank">
              <IoLogoWhatsapp className={classes.Icons} />
            </a>
            <a
              href="https://www.linkedin.com/in/hedristemmytop/"
              target="_blank"
            >
              <IoLogoLinkedin className={classes.Icons} />
            </a>
          </span>
        </div>
      </aside>
      <div className={classes.Links}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Video</Link>
          </li>
          <li>
            <Link to="/">Books</Link>
          </li>
          <li>
            <Link to="/">About us</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/">Terms of use</Link>
          </li>
          <li>
            <Link to="/">Faqs</Link>
          </li>
          <li>
            <Link to="/">Consulting</Link>
          </li>
          <li>
            <Link to="/">Terms & Condition</Link>
          </li>
        </ul>
        <ul className={classes.Last}>
          <li>
            <Link to="/">Privacy policy</Link>
          </li>
          <li>
            <Link to="/">Contact us</Link>
          </li>
        </ul>
      </div>
      <div className={classes.Sub}>
        <div className={classes.Text}>
          Subscribe to our Newsletter to get updated changes
        </div>
        <div className={classes.Input}>
          <input type="text" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
