import React from "react";
import { Link } from "react-router-dom";
import classes from "../../../styles/Articles.module.css";
const Updates = ({ data }) => {
  return (
    <div className={classes.Update}>
      <div>
        <div className={classes.Title}>Updates</div>
        <div
          style={{
            color: "rgb(196,196,196,1)",
            fontWeight: "700",
            fontSize: "1.2rem",
            marginBottom: "1.2rem",
          }}
        >
          TIPS
        </div>
        <div
          style={{
            paddingBottom: "3.2rem",
            borderBottom: "1px solid rgba(78,77,77,1)",
            marginBottom: "3.2rem",
          }}
        >
          3 tips to avoid internet distractions at work
        </div>
        <div
          style={{
            color: "rgb(196,196,196,1)",
            fontWeight: "700",
            fontSize: "1.2rem",
            marginBottom: "1.2rem",
          }}
        >
          RESOURCES
        </div>
        <div
          style={{
            paddingBottom: "3.2rem",
            borderBottom: "1px solid rgba(78,77,77,1)",
            marginBottom: "3.2rem",
          }}
        >
          7 great productivity apps for new Ipad
        </div>
        <div
          style={{
            color: "rgb(196,196,196,1)",
            fontWeight: "700",
            fontSize: "1.2rem",
            marginBottom: "1.2rem",
          }}
        >
          GUIDES
        </div>
        <div
          style={{
            paddingBottom: "3.2rem",
            marginBottom: "3.2rem",
          }}
        >
          How to create an organized productivity plan for the year
        </div>
      </div>
      <div>
        <div className={classes.Title}>Popular articles</div>
        {data.map((data, i) => (
          <div className={classes.PopularBox} key={i}>
            <div className={classes.Image}>
              <img
                src={data.image}
                className={classes.img}
                alt="article image"
              />
            </div>
            <div className={classes.RightPopularBox}>
              <div className={classes.PopularLinks}>
                <Link to="beginner">Beginner</Link>
                <Link to="ionic">Beginner</Link>
                <Link to="stencil">Stencil</Link>
              </div>
              <div>Building a PWA with Stencil: Rendering Layouts</div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className={classes.Title}>Notice</div>
        <div>
          Looking forward for ionic and Angular Training ? Consider a membership
          to my other website
        </div>
        <button className={classes.ButtonPro}>Become a pro member</button>
      </div>
    </div>
  );
};

export default Updates;
