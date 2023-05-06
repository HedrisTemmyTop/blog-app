import classes from "../../../../styles/Articles.module.css";
import { Link } from "react-router-dom";
import defaultImage from "../../../../assets/default_img.jpeg";
import { GrView, IoMdTime, CiEdit } from "../../../react-icons/index";
import formartDate from "../../../../logic/formartDate";
const ProfileBlogs = ({ data, darkTheme, username, profileImage }) => {
  return (
    <div
      className={[
        classes.Box,

        darkTheme ? classes.BoxDark : classes.BoxLight,
      ].join(" ")}
    >
      <div className={classes.Image}>
        <img src={data.image[0]} alt="blog" className={classes.ImagesImg} />
      </div>
      <div className={classes.Block}>
        <div className={classes.Links}>
          {data.tags.slice(0, 3).map((link, i) => (
            <span key={i} style={{ textTransform: "capitalize" }}>
              {link}
            </span>
          ))}
        </div>
        <div
          className={[
            classes.BoxAbout,
            darkTheme ? classes.BoxAboutDark : classes.BoxAboutLight,
          ].join(" ")}
        >
          {data.title}
        </div>
        <div
          className={[
            classes.Content,
            darkTheme ? classes.ContentDark : classes.ContentLight,
          ].join(" ")}
        >
          {data.description.split("").length > 100
            ? `${data.description.slice(0, 100)}...`
            : data.description}
        </div>
        <div className={classes.Bottom}>
          <div className={classes.Left}>
            <div className={classes.LeftImage}>
              <img
                src={profileImage ? profileImage : defaultImage}
                alt="user"
              />
            </div>
            <div className={classes.LeftContent}>
              <div style={darkTheme ? { color: "#fff" } : { color: "black" }}>
                {username.slice(0, 30)}
              </div>
              <i style={darkTheme ? { color: "#fff" } : { color: "#888888" }}>
                {formartDate(data.createdAt)}
              </i>
            </div>
          </div>
          <div className={classes.Right}>
            <div className={classes.Icon}>
              <IoMdTime
                style={darkTheme ? { color: "#fff" } : { color: "black" }}
              />
            </div>
            <i
              className={classes.Time}
              style={darkTheme ? { color: "#fff" } : { color: "#888888" }}
            >
              {data.reading_time} min read
            </i>
          </div>
        </div>
      </div>
      <div className={classes.Hover}>
        <div className={classes.HoverContent}>
          <Link to={"/edit-blog/" + data._id}>
            <button>
              <CiEdit />
              <span>Edit</span>
            </button>
          </Link>
          <div style={{ color: "#fff" }}>or</div>
          <Link to={"/blogs/" + data._id}>
            <GrView style={{ color: "white" }} />
            <span className={classes.Del}>View Post</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileBlogs;
