import classes from "../../../styles/CreateBlog.module.css";

interface PropTypes {
  handleShow: () => void;
  handleHide: () => void;
}
const Preview = ({ handleShow, handleHide }: PropTypes) => {
  return (
    <div className={classes.ToggleBtns}>
      <button className={classes.ToggleBtn} onClick={handleHide}>
        Write
      </button>
      <button className={classes.ToggleBtn} onClick={handleShow}>
        Preview
      </button>
    </div>
  );
};

export default Preview;
