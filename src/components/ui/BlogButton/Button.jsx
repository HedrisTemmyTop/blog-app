import classes from "../../../styles/Blog.module.css";

const BlogButton = ({ loading, click, type }) => {
  return (
    <button
      className={classes[type]}
      disabled={loading ? true : false}
      style={loading ? { backgroundColor: "blue !important" } : null}
      onClick={click}
    >
      <span>{loading ? "Processing ..." : type}</span>
    </button>
  );
};

export default BlogButton;
