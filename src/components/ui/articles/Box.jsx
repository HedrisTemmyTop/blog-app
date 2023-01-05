import React from "react";
import classes from "../../../styles/Articles.module.css";
import { Link } from "react-router-dom";
import { IoMdTime } from "react-icons/io";
const Box = ({ data }) => {
  return (
    <div className={classes.Boxes}>
      {data.map((data) => {
        return (
          <div className={classes.Box} key={data.id}>
            <div className={classes.Image}>
              <img
                src={data.image}
                alt="blog-image"
                className={classes.ImagesImg}
              />
            </div>
            <div className={classes.Block}>
              <div className={classes.Links}>
                {data.category.map((link, i) => (
                  <Link
                    to={link}
                    style={{ textTransform: "capitalize" }}
                    key={i}
                  >
                    {link}
                  </Link>
                ))}
              </div>
              <div className={classes.BoxAbout}>
                Why XSS Attacks Are More Dangerous for Capacitor/Cordova Apps..
              </div>
              <div className={classes.Content}>
                In this article, we demonstrate how there are more avenues for
                XSS attacks in Capacitor/Cordova applications and how the impact
                can be worse.
              </div>
              <div className={classes.Bottom}>
                <div className={classes.Left}>
                  <div className={classes.LeftImage}>
                    <img src={data.user} />
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
                  <i className={classes.Time}>5 min read</i>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Box;
