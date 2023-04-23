import classes from "../../../../styles/Articles.module.css";
import { Link } from "react-router-dom";
import img from "../../../../assets/Rectangle 4.png";
import userImg from "../../../../assets/Ellipse.png";
import formartDate from "../../../../logic/formartDate";
import { IoMdTime } from "../../../react-icons/index";

const HomepageBlog = ({ data, darkTheme }) => {
  return (
    <div
      className={[
        classes.Box,
        darkTheme ? classes.BoxDark : classes.BoxLight,
      ].join(" ")}
    >
      <Link to={"/blogs/" + data._id}>
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
                  {data.owner.username.length > 30
                    ? data.owner.username.slice(0, 30)
                    : data.owner.username}
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
      </Link>
    </div>
  );
};

export default HomepageBlog;
