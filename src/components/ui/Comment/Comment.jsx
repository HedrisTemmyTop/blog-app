import classes from "../../../styles/Blog.module.css";

import Replies from "../blogReplies/replies";
const Comment = ({ ownerID, userId, darkTheme }) => {
  // if current user is the owner don't give a comment form
  return (
    <div className={darkTheme ? classes.Comment : classes.CommentLight}>
      <Replies darkTheme={darkTheme} />
      {ownerID !== userId ? (
        <div className={classes.AddPost}>
          <textarea
            className={classes.TextArea}
            placeholder="Say something..."
          ></textarea>
          <div className={classes.AddButton}>
            <button className={classes.Add}>
              <span>COMMENT</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Comment;
