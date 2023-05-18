import classes from "../../../../styles/Blog.module.css";

interface PropTypes {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setCommentInput: (value: string) => void;
  commenting: boolean;
  commentInput: string;
}

const CommentInput = (props: PropTypes) => {
  const { handleSubmit, setCommentInput, commenting, commentInput } = props;
  return (
    <form
      className={classes.AddPost}
      name="submit-comment"
      onSubmit={handleSubmit}
    >
      <textarea
        className={classes.TextArea}
        placeholder="Say something..."
        value={commentInput}
        name="message"
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
