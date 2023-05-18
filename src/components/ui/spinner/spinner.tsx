import classes from "./spinner.module.css";
const Spinner = () => {
  return (
    <div className={classes.loader}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
