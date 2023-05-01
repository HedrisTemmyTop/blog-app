import classes from "../../../styles/Profile.module.css";
import defaultImage from "../../../assets/default_img.png";
import { useContext } from "react";
import { ThemeContext } from "../../../context/context";

const Bio = ({ username, job, userImage }) => {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <div className={darkTheme ? classes.Bio : classes.BioLight}>
      <div className={classes.Left}>
        <div className={classes.Image}>
          <img src={userImage ? userImage[0] : defaultImage} alt="display " />
        </div>
        <div className={classes.Name}>
          <div className={classes.UserName}>{username}</div>
          <div className={classes.Job}>
            {job.length > 0 ? job[0] : "No_Job"}
          </div>
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
