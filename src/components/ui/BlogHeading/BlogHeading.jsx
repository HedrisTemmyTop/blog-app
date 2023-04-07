import classes from "../../../styles/Blog.module.css";
import BlogButton from "../BlogButton/Button";
const BlogHeading = ({
  title,
  state,
  isLoading,
  deleteHandler,
  publishHandler,
  owner,
  userId,
}) => {
  let buttonJSX = null;
  if (owner._id === userId)
    buttonJSX =
      state === "draft" ? (
        <BlogButton loading={isLoading} click={publishHandler} type="Publish" />
      ) : (
        <BlogButton loading={isLoading} click={deleteHandler} type="Delete" />
      );
  return (
    <div classes={classes.ContentHeading}>
      <div className={classes.Title}>{title}</div>

      {buttonJSX}
    </div>
  );
};

export default BlogHeading;
