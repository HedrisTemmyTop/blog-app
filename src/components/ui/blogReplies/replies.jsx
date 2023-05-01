import React, { useState } from "react";
import classes from "../../../styles/Blog.module.css";
import { Link } from "react-router-dom";
import user from "../../../assets/Ellipse.png";
import formartDate from "../../../logic/formartDate";
import defaultImage from "../../../assets/default_img.png";

const Replies = ({ darkTheme, comment }) => {
  const sortedComment = () => {
    return comment.sort(
      (a, b) =>
        new Date(b.createdAt ? b.createdAt : b.updatedAt) -
        new Date(a.createdAt ? a.createdAt : a.updatedAt)
    );
  };
  const [hide, setHide] = useState(true);
  const handleViewAll = (e) => {
    setHide((prev) => !prev);
  };
  return (
    <React.Fragment>
      <div className={classes.CommentHead}>
        <div className={classes.HeadLeft}>
          <span className={classes.Cap}>Comments</span>
          <span className={classes.Num}>({comment.length})</span>
        </div>
        <div className={classes.HeadRight}>
          <Link to="" onClick={handleViewAll}>
            {!hide ? "Show Less" : "View All"}
          </Link>
        </div>
      </div>
      <div id="commentContainer">
        {hide
          ? sortedComment()
              .slice(0, 2)
              .map((comment, i) => (
                <div
                  className={classes.Comments}
                  key={comment._id}
                  style={i === comment.length - 1 ? { borderBottom: 0 } : null}
                >
                  <div className={classes.CommentsLeft}>
                    <div className={classes.Commenter}>
                      <img
                        src={
                          comment.author.image
                            ? comment.author.image[0]
                            : defaultImage
                        }
                        alt="comment"
                      />
                      <div className={classes.CommenterRight}>
                        <div
                          className={classes.CommentName}
                          style={!darkTheme ? { color: "#1e1e1e" } : null}
                        >
                          {comment.author.username}
                        </div>
                        <div
                          className={classes.Time}
                          style={!darkTheme ? { color: "#999999" } : null}
                        >
                          {formartDate(comment.createdAt, "days")}
                        </div>
                      </div>
                    </div>
                    <i
                      className={classes.comment}
                      style={!darkTheme ? { color: "#999999" } : null}
                    >
                      {comment.content}
                    </i>
                  </div>
                  <button
                    className={classes.Reply}
                    style={!darkTheme ? { color: "#999999" } : null}
                  >
                    Reply
                  </button>
                </div>
              ))
          : sortedComment().map((comment, i) => (
              <div
                className={classes.Comments}
                key={comment._id}
                style={i === comment.length - 1 ? { borderBottom: 0 } : null}
              >
                <div className={classes.CommentsLeft}>
                  <div className={classes.Commenter}>
                    <img
                      src={
                        comment.author.image
                          ? comment.author.image[0]
                          : defaultImage
                      }
                      alt="comment"
                    />
                    <div className={classes.CommenterRight}>
                      <div
                        className={classes.CommentName}
                        style={!darkTheme ? { color: "#1e1e1e" } : null}
                      >
                        {comment.author.username}
                      </div>
                      <div
                        className={classes.Time}
                        style={!darkTheme ? { color: "#999999" } : null}
                      >
                        {formartDate(comment.createdAt, "days")}
                      </div>
                    </div>
                  </div>
                  <i
                    className={classes.comment}
                    style={!darkTheme ? { color: "#999999" } : null}
                  >
                    {comment.content}
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
      </div>
    </React.Fragment>
  );
};

export default Replies;
