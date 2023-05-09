import classes from "../../../../styles/Blog.module.css";

const CommentInput = ({
  handleSubmit,
  setCommentInput,
  commenting,
  commentInput,
}) => {
  return (
    <form
      className={classes.AddPost}
      name="submit-comment"
      onSubmit={handleSubmit}
    >
      <textarea
        className={classes.TextArea}
        placeholder="Say something..."
        type="text"
        value={commentInput}
        name="input"
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
  );
};

export default CommentInput;
