import React, { useContext } from "react";
import classes from "../../../styles/Articles.module.css";
import { Link } from "react-router-dom";
import { IoMdTime } from "react-icons/io";
import img from "../../../assets/Rectangle 4.png";
import userImg from "../../../assets/Ellipse.png";
import { ThemeContext } from "../../../context/context";
const Box = ({ data, button }) => {
  console.log(button);
  const darkTheme = useContext(ThemeContext);
  return !button ? (
    <Link
      to={"/blogs/" + data._id}
      className={[
        classes.Box,
        darkTheme ? classes.BoxDark : classes.BoxLight,
      ].join(" ")}
    >
      <div className={classes.Image}>
        <img
          src={data.image ? data.image : img}
          alt="blog-image"
          className={classes.ImagesImg}
        />
      </div>
      <div className={classes.Block}>
        <div className={classes.Links}>
          {data.tags.slice(0, 3).map((link, i) => (
            <Link to={link} style={{ textTransform: "capitalize" }} key={i}>
              {link}
            </Link>
          ))}
        </div>
        <div
          className={[
            classes.BoxAbout,
            darkTheme ? classes.BoxAboutDark : classes.BoxAboutLight,
          ].join(" ")}
        >
          Why XSS Attacks Are More Dangerous for Capacitor/Cordova Apps..
        </div>
        <div
          className={[
            classes.Content,
            darkTheme ? classes.ContentDark : classes.ContentLight,
          ].join(" ")}
        >
          {data.body.slice(0, 100)}...
        </div>
        <div className={classes.Bottom}>
          <div className={classes.Left}>
            <div className={classes.LeftImage}>
              <img src={data.userImg ? data.user.img : userImg} />
            </div>
            <div className={classes.LeftContent}>
              <div style={darkTheme ? { color: "#fff" } : { color: "black" }}>
                Josh Morony
              </div>
              <i style={darkTheme ? { color: "#fff" } : { color: "#888888" }}>
                February 15, 2021
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
  ) : (
    <div
      className={[
        classes.Box,

        darkTheme ? classes.BoxDark : classes.BoxLight,
      ].join(" ")}
    >
      <div className={classes.Image}>
        <img
          src={data.image ? data.image : img}
          alt="blog-image"
          className={classes.ImagesImg}
        />
      </div>
      <div className={classes.Block}>
        <div className={classes.Links}>
          {data.tags.slice(0, 3).map((link, i) => (
            <Link to={link} style={{ textTransform: "capitalize" }} key={i}>
              {link}
            </Link>
          ))}
        </div>
        <div
          className={[
            classes.BoxAbout,
            darkTheme ? classes.BoxAboutDark : classes.BoxAboutLight,
          ].join(" ")}
        >
          Why XSS Attacks Are More Dangerous for Capacitor/Cordova Apps..
        </div>
        <div
          className={[
            classes.Content,
            darkTheme ? classes.ContentDark : classes.ContentLight,
          ].join(" ")}
        >
          {data.body.slice(0, 100)}...
        </div>
        <div className={classes.Bottom}>
          <div className={classes.Left}>
            <div className={classes.LeftImage}>
              <img src={data.userImg ? data.user.img : userImg} />
            </div>
            <div className={classes.LeftContent}>
              <div style={darkTheme ? { color: "#fff" } : { color: "black" }}>
                Josh Morony
              </div>
              <i style={darkTheme ? { color: "#fff" } : { color: "#888888" }}>
                February 15, 2021
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
              <span>i</span>
              <span>Edit</span>
            </button>
          </Link>
          <div style={{ color: "#fff" }}>or</div>
          <div className={classes.Del}>Delete Post</div>
        </div>
      </div>
    </div>
  );
};

export default Box;
