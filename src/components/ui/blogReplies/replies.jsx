import React from "react";
import classes from "../../../styles/Blog.module.css";
import { Link } from "react-router-dom";
import user from "../../../assets/Ellipse.png";
const Replies = ({ darkTheme }) => {
  const comments = [{}, {}];
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
      {comments.map((comment, i) => (
        <div
          className={classes.Comments}
          key={i}
          style={i === comments.length - 1 ? { borderBottom: 0 } : null}
        >
          <div className={classes.CommentsLeft}>
            <div className={classes.Commenter}>
              <img src={user} alt="comment" />
              <div className={classes.CommenterRight}>
                <div
                  className={classes.CommentName}
                  style={!darkTheme ? { color: "#1e1e1e" } : null}
                >
                  Ani Duncan
                </div>
                <div
                  className={classes.Time}
                  style={!darkTheme ? { color: "#999999" } : null}
                >
                  5 hrs ago
                </div>
              </div>
            </div>
            <i
              className={classes.comment}
              style={!darkTheme ? { color: "#999999" } : null}
            >
              Thank you very much for this resources it’s really helpful
            </i>
          </div>
          <button
            className={classes.Reply}
            style={!darkTheme ? { color: "#999999" } : null}
          >
            Reply
          </button>
        </div>
      ))}
    </React.Fragment>
  );
};

export default Replies;
