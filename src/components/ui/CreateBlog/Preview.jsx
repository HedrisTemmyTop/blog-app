import classes from "../../../styles/CreateBlog.module.css";

const Preview = ({ previewRef, formRef }) => {
  return (
    <div className={classes.ToggleBtns}>
      <button
        className={classes.ToggleBtn}
        onClick={() => {
          previewRef.current.style.display = "none";
          formRef.current.style.display = "block";
        }}
      >
        Write
      </button>
      <button
        className={classes.ToggleBtn}
        onClick={() => {
          previewRef.current.style.display = "block";
          formRef.current.style.display = "none";
        }}
      >
        Preview
      </button>
    </div>
  );
};

export default Preview;
