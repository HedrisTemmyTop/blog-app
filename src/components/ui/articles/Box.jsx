import React from "react";
import classes from "../../../styles/Articles.module.css";
import { Link } from "react-router-dom";
import { IoMdTime } from "react-icons/io";
import img from "../../../assets/Rectangle 4.png";
import userImg from "../../../assets/Ellipse.png";
const Box = ({ data }) => {
  return (
    // to={"blogs/" + data.id}
    <Link to={"blogs/" + data._id} className={classes.Box}>
      <div className={classes.Image}>
        <img
          src={data.image.length > 0 ? data.image : img}
          alt="blog-image"
          className={classes.ImagesImg}
        />
      </div>
      <div className={classes.Block}>
        <div className={classes.Links}>
          {data.tags.map((link, i) => (
            <Link to={link} style={{ textTransform: "capitalize" }} key={i}>
              {link}
            </Link>
          ))}
        </div>
        <div className={classes.BoxAbout}>
          Why XSS Attacks Are More Dangerous for Capacitor/Cordova Apps..
        </div>
        <div className={classes.Content}>{data.body.slice(0, 100)}...</div>
        <div className={classes.Bottom}>
          <div className={classes.Left}>
            <div className={classes.LeftImage}>
              <img src={data.userImg ? data.user.img : userImg} />
            </div>
            <div className={classes.LeftContent}>
              <div>Josh Morony</div>
              <i>February 15, 2021</i>
            </div>
          </div>
          <div className={classes.Right}>
            <div className={classes.Icon}>
              <IoMdTime />
            </div>
            <i className={classes.Time}>{data.reading_time} min read</i>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Box;
