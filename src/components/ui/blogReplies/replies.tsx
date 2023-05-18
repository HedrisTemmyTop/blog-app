import React, { useState } from "react";
import classes from "../../../styles/Blog.module.css";
import { Link } from "react-router-dom";

import formartDate from "../../../logic/formartDate";
import defaultImage from "../../../assets/default_img.jpeg";
import { commentInterface } from "../../../Interface/BlogInterface";

interface PropTypes {
  darkTheme: boolean;
  comment: commentInterface[];
}

const Replies = (props: PropTypes) => {
  const { darkTheme, comment } = props;

  const sortedComment = () => {
    return comment.sort(
      (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
    );
  };
  const [hide, setHide] = useState(true);
  const handleViewAll = () => {
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
              .map((reply, i) => (
                <div
                  className={classes.Comments}
                  key={reply._id}
                  style={comment.length - 1 === i ? { borderBottom: 0 } : {}}
                  data-testid="comment"
                >
                  <div className={classes.CommentsLeft}>
                    <Link
                      to={"/profile/" + reply.author._id}
                      className={classes.Commenter}
                    >
                      <img
                        src={
                          reply.author.profileImage
                            ? reply.author.profileImage
                            : defaultImage
                        }
                        alt="poster"
                      />
                      <div className={classes.CommenterRight}>
                        <div
                          className={classes.CommentName}
                          style={!darkTheme ? { color: "#1e1e1e" } : {}}
                          data-testid="author-username"
                        >
                          {reply.author.username}
                        </div>
                        <div
                          className={classes.Time}
                          style={!darkTheme ? { color: "#999999" } : {}}
                          data-testid="date"
                        >
                          {formartDate(reply.createdAt, "days")}
                        </div>
                      </div>
                    </Link>
                    <i
                      className={classes.comment}
                      style={!darkTheme ? { color: "#999999" } : {}}
                      data-testid="text-content"
                    >
                      {reply.content}
                    </i>
                  </div>
                  <button
                    className={classes.Reply}
                    style={!darkTheme ? { color: "#999999" } : {}}
                  >
                    Reply
                  </button>
                </div>
              ))
          : sortedComment().map((reply, i) => (
              <div
                className={classes.Comments}
                key={reply._id}
                style={i === comment.length - 1 ? { borderBottom: 0 } : {}}
                data-testid="comment"
              >
                <div className={classes.CommentsLeft}>
                  <Link
                    to={"/profile/" + reply.author._id}
                    className={classes.Commenter}
                  >
                    <img
                      src={
                        reply.author.profileImage
                          ? reply.author.profileImage
                          : defaultImage
                      }
                      alt="poster"
                    />
                    <div className={classes.CommenterRight}>
                      <div
                        className={classes.CommentName}
                        style={!darkTheme ? { color: "#1e1e1e" } : {}}
                        data-testid="author-username"
                      >
                        {reply.author.username}
                      </div>
                      <div
                        className={classes.Time}
                        style={!darkTheme ? { color: "#999999" } : {}}
                        data-testid="date"
                      >
                        {formartDate(reply.createdAt, "days")}
                      </div>
                    </div>
                  </Link>
                  <i
                    className={classes.comment}
                    style={!darkTheme ? { color: "#999999" } : {}}
                    data-testid="text-content"
                  >
                    {reply.content}
                  </i>
                </div>
                <button
                  className={classes.Reply}
                  style={!darkTheme ? { color: "#999999" } : {}}
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
