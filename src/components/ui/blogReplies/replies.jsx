import React, { useState } from "react";
import classes from "../../../styles/Blog.module.css";
import { Link } from "react-router-dom";

import formartDate from "../../../logic/formartDate";
import defaultImage from "../../../assets/default_img.jpeg";

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
        <div className={classes.HeadLeft} data-testid="comment-total">
          <span className={classes.Cap}>Comments</span>
          <span className={classes.Num}>({comment.length})</span>
        </div>
        <div className={classes.HeadRight}>
          <div onClick={handleViewAll}>{!hide ? "Show Less" : "View All"}</div>
        </div>
      </div>
      <div id="commentContainer" data-testid="comment-container">
        {hide
          ? sortedComment()
              .slice(0, 2)
              .map((comment, i) => (
                <div
                  className={classes.Comments}
                  key={comment._id}
                  style={i === comment.length - 1 ? { borderBottom: 0 } : null}
                  data-testid="comment"
                >
                  <div className={classes.CommentsLeft}>
                    <Link
                      to={"/profile/" + comment.author._id}
                      className={classes.Commenter}
                    >
                      <img
                        src={
                          comment.author.profileImage
                            ? comment.author.profileImage
                            : defaultImage
                        }
                        alt="poster"
                      />
                      <div className={classes.CommenterRight}>
                        <div
                          className={classes.CommentName}
                          style={!darkTheme ? { color: "#1e1e1e" } : null}
                          data-testid="author-username"
                        >
                          {comment.author.username}
                        </div>
                        <div
                          className={classes.Time}
                          style={!darkTheme ? { color: "#999999" } : null}
                          data-testid="date"
                        >
                          {formartDate(comment.createdAt, "days")}
                        </div>
                      </div>
                    </Link>
                    <i
                      className={classes.comment}
                      style={!darkTheme ? { color: "#999999" } : null}
                      data-testid="text-content"
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
                data-testid="comment"
              >
                <div className={classes.CommentsLeft}>
                  <Link
                    to={"/profile/" + comment.author._id}
                    className={classes.Commenter}
                  >
                    <img
                      src={
                        comment.author.profileImage
                          ? comment.author.profileImage
                          : defaultImage
                      }
                      alt="poster"
                    />
                    <div className={classes.CommenterRight}>
                      <div
                        className={classes.CommentName}
                        style={!darkTheme ? { color: "#1e1e1e" } : null}
                        data-testid="author-username"
                      >
                        {comment.author.username}
                      </div>
                      <div
                        className={classes.Time}
                        style={!darkTheme ? { color: "#999999" } : null}
                        data-testid="date"
                      >
                        {formartDate(comment.createdAt, "days")}
                      </div>
                    </div>
                  </Link>
                  <i
                    className={classes.comment}
                    style={!darkTheme ? { color: "#999999" } : null}
                    data-testid="text-content"
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
