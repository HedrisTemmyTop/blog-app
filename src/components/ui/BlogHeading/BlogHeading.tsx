import { Heading } from "../../../Interface/BlogInterface";
import classes from "../../../styles/Blog.module.css";
import BlogButton from "../BlogButton/Button";
const BlogHeading = (props: Heading) => {
  const {
    isLoading,
    deleteHandler,
    publishHandler,
    blog: {
      title,

      state,
      owner,
    },
    userId,
    darkTheme,
    isDeleting,
  } = props;
  let buttonJSX = null;
  if (owner._id === userId)
    buttonJSX =
      state === "draft" ? (
        <BlogButton loading={isLoading} click={publishHandler} type="Publish" />
      ) : (
        <BlogButton loading={isDeleting} click={deleteHandler} type="Delete" />
      );
  return (
    <div className={classes.ContentHeading}>
      <div
        className={classes.Title}
        style={!darkTheme ? { color: "#1e1e1e" } : {}}
      >
        {title}
      </div>

      {buttonJSX}
    </div>
  );
};

export default BlogHeading;
