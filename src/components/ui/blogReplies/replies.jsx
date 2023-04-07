import React from "react";
import classes from "../../../styles/Blog.module.css";
import { Link } from "react-router-dom";
import user from "../../../assets/Ellipse.png";
const Replies = () => {
  return (
    <React.Fragment>
      <div className={classes.CommentHead}>
        <div className={classes.HeadLeft}>
          <span className={classes.Cap}>Comments</span>
          <span className={classes.Num}>(10)</span>
        </div>
        <div className={classes.HeadRight}>
          <Link to="">View All</Link>
        </div>
      </div>
      <div className={classes.Comments}>
        <div className={classes.CommentsLeft}>
          <div className={classes.Commenter}>
            <img src={user} alt="comment" />
            <div className={classes.CommenterRight}>
              <div className={classes.CommentName}>Ani Duncan</div>
              <div className={classes.Time}>5 hrs ago</div>
            </div>
          </div>
          <i className={classes.comment}>
            Thank you very much for this resources it’s really helpful
          </i>
        </div>
        <button className={classes.Reply}>Reply</button>
      </div>
      <div className={classes.Comments} style={{ border: "0" }}>
        <div className={classes.CommentsLeft}>
          <div className={classes.Commenter}>
            <img src={user} alt="comment" />
            <div className={classes.CommenterRight}>
              <div className={classes.CommentName}>Ani Duncan</div>
              <div className={classes.Time}>5 hrs ago</div>
            </div>
          </div>
          <i className={classes.comment}>
            Thank you very much for this resources it’s really helpful
          </i>
        </div>
        <button className={classes.Reply}>Reply</button>
      </div>
    </React.Fragment>
  );
};

export default Replies;
