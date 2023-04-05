import classes from "../../../styles/Profile.module.css";

import img from "../../../assets/Ellipse.png";

const Bio = ({ username }) => {
  return (
    <div className={classes.Bio}>
      <div className={classes.Left}>
        <div className={classes.Image}>
          <img src={img} alt="display picture" />
        </div>
        <div className={classes.Name}>
          <div className={classes.UserName}>{username}</div>
          <div className={classes.Job}>Front-end dev</div>
        </div>
      </div>
      <blockquote>
        A bio tells an audience who you are, and what you've done, and also
        hints at what you are capable of doing. It can help potential employers,
        fans, or customers get a sense of your personality and what you stand
        for.
      </blockquote>
    </div>
  );
};

export default Bio;
