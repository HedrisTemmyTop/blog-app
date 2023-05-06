import classes from "../../../styles/header.module.css";

import { Link } from "react-router-dom";
import { BsBookmarkPlus, BsJournalBookmark } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { AiOutlineLogout, AiOutlineDeploymentUnit } from "react-icons/ai";
const UserNav = ({ id, username, click, userImage, lastname, firstname }) => {
  return (
    <div className={classes.UserNavWrapper}>
      <div className={classes.UserNavSummary}>
        <Link to={"profile/" + id} className={classes.UserNavHead}>
          <img
            src={userImage}
            alt="profile image"
            className={classes.UserNavImage}
          />
          <span className={classes.UserNavName}>
            <h2 className={classes.FullName}>
              {firstname.split("").length > 20
                ? `${lastname} ${firstname.split("").slice(0, 20).join("")}...`
                : `${lastname} ${firstname}`}
            </h2>
            <div className={classes.UserHandle}>
              @
              {username.split("").slice(0, 30).length > 20
                ? `${username.split("").slice(0, 20).join("")}...`
                : username}
            </div>
          </span>
        </Link>
        <ul className={classes.UserNavLinks}>
          <Link to="/">
            <li>
              <BsBookmarkPlus />
              <span className={classes.LinkName}>Bookmarks</span>
            </li>
          </Link>
          <Link to="/">
            <li>
              <BsJournalBookmark />
              <span className={classes.LinkName}>My Drafts</span>
            </li>
          </Link>
          <Link to="/premium">
            <li>
              <AiOutlineDeploymentUnit />
              <span className={classes.LinkName}>Upgrade account</span>
            </li>
          </Link>
          <Link to="/account-settings">
            <li>
              <VscAccount />
              <span className={classes.LinkName}>Account Settings</span>
            </li>
          </Link>

          <button className={classes.Logout} onClick={click}>
            <span className={classes.LogoutBtn}>
              <AiOutlineLogout />
              <span className={classes.LinkName}>Log out</span>
            </span>
          </button>
        </ul>
        <div className={classes.Pointer}></div>
      </div>
    </div>
  );
};

export default UserNav;
