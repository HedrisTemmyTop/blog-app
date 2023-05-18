import classes from "../../../styles/Blog.module.css";
interface PropTypes {
  loading: boolean;
  click: () => void;
  type: string;
}

const BlogButton = (props: PropTypes) => {
  const { loading, click, type } = props;
  return (
    <button
      className={classes[type]}
      disabled={loading ? true : false}
      style={loading ? { backgroundColor: "blue !important" } : {}}
      onClick={click}
    >
      <span>{loading ? "Processing ..." : type}</span>
    </button>
  );
};

export default BlogButton;
