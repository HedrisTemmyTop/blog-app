import axios from "axios";
import { useEffect, useState } from "react";
import API_URL from "../../../api/URL";
import classes from "../../../styles/Blog.module.css";
import user from "../../../assets/Ellipse.png";
import formartDate from "../../../logic/formartDate";
import Replies from "../blogReplies/replies";
import "../../../index.css";
import AlertMessage from "../../alertMessage/alertMessage";
import ErrorHandler from "../../../logic/errorHandler";
const Comment = ({ ownerID, postId, darkTheme, comment }) => {
  const [commentInput, setCommentInput] = useState("");
  const [commenting, setCommenting] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const [commented, setCommented] = useState(false);
  // if current user is the owner don't give a comment form
  useEffect(() => {
    if (commented) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
    if (error === "Unauthorized") {
      setTimeout(() => {
        window.location.href = "/sign-in";
      }, 3000);
    }
  }, [commented, error]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!token) window.location.href = "/sign-in";
    setCommenting(true);
    axios
      .post(
        API_URL + "comment",
        {
          postId,
          content: commentInput,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((_) => {
        setCommenting(false);
        setCommented(true);
      })
      .catch((e) => {
        console.log(e);
        setCommenting(false);
        setError(e.response ? e.response.data : e.message);
      });
  };
  return (
    <ErrorHandler
      errorMessage={error}
      duration={error === "Unauthorized" ? 2800 : 5000}
    >
      <div className={darkTheme ? classes.Comment : classes.CommentLight}>
        <Replies darkTheme={darkTheme} comment={comment} />
        {commented && (
          <AlertMessage
            duration={2000}
            message="Comment Added"
            bgColor="success"
          />
        )}

        <form className={classes.AddPost} onSubmit={handleSubmit}>
          <textarea
            className={classes.TextArea}
            placeholder="Say something..."
            value={commentInput}
            onChange={(e) => {
              setCommentInput(e.target.value);
            }}
            required
          ></textarea>
          <div className={classes.AddButton}>
            <button className={classes.Add}>
              <span>{commenting ? "SENDING..." : "COMMENT"}</span>
            </button>
          </div>
        </form>
      </div>
    </ErrorHandler>
  );
};

export default Comment;
