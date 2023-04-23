import classes from "../../../../styles/Articles.module.css";
import { Link } from "react-router-dom";
import img from "../../../../assets/Rectangle 4.png";
import userImg from "../../../../assets/Ellipse.png";
import { GrView, IoMdTime, CiEdit } from "../../../react-icons/index";
import formartDate from "../../../../logic/formartDate";
const ProfileBlogs = ({ data, darkTheme }) => {
  return (
    <div
      className={[
        classes.Box,

        darkTheme ? classes.BoxDark : classes.BoxLight,
      ].join(" ")}
    >
      <div className={classes.Image}>
        <img
          src={data.image.length > 0 ? data.image : img}
          alt="blog-image"
          className={classes.ImagesImg}
        />
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
          {data.description
            ? data.description.slice(0, 100)
            : "description is comminf"}
          ...
        </div>
        <div className={classes.Bottom}>
          <div className={classes.Left}>
            <div className={classes.LeftImage}>
              <img src={data.userImg ? data.user.img : userImg} />
            </div>
            <div className={classes.LeftContent}>
              <div style={darkTheme ? { color: "#fff" } : { color: "black" }}>
                {/* {data.owner.firstname} */}
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
