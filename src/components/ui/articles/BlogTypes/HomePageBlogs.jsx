import classes from "../../../../styles/Articles.module.css";
import { Link } from "react-router-dom";

import defaultImage from "../../../../assets/default_img.jpeg";

import formartDate from "../../../../logic/formartDate";
import { IoMdTime } from "../../../react-icons/index";

const HomepageBlog = ({ data, darkTheme }) => {
  return (
    <div
      className={[
        classes.Box,
        darkTheme ? classes.BoxDark : classes.BoxLight,
      ].join(" ")}
      data-testid="home-blog-container"
    >
      <Link to={"/blogs/" + data._id}>
        <div className={classes.Image}>
          <img src={data.image[0]} alt="blog" className={classes.ImagesImg} />
        </div>
        <div className={classes.Block}>
          <div className={classes.Links}>
            {data.tags.slice(0, 3).map((link, i) => (
              <span
                key={i}
                style={{ textTransform: "capitalize" }}
                data-testid="tag-id"
              >
                {link}
              </span>
            ))}
          </div>
          <div
            className={[
              classes.BoxAbout,
              darkTheme ? classes.BoxAboutDark : classes.BoxAboutLight,
            ].join(" ")}
            data-testid="title"
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
              ? `${data.description.slice(0, 100)}`
              : data.description}
            .
          </div>
          <div className={classes.Bottom}>
            <div className={classes.Left}>
              <div className={classes.LeftImage}>
                <img
                  src={
                    data.owner?.profileImage
                      ? data.owner.profileImage
                      : defaultImage
                  }
                  alt="user"
                />
              </div>
              <div className={classes.LeftContent}>
                <div style={darkTheme ? { color: "#fff" } : { color: "black" }}>
                  {data.owner.username.length > 30
                    ? data.owner.username.slice(0, 30)
                    : data.owner.username}
                </div>
                <i
                  style={darkTheme ? { color: "#fff" } : { color: "#888888" }}
                  data-testid="date"
                >
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
                data-testid="reading-time"
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
