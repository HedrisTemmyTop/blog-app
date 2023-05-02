import classes from "../../../styles/Profile.module.css";
import { useContext } from "react";
import { ThemeContext } from "../../../context/context";

const Bio = ({ username, job, userImage, bio }) => {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <div className={darkTheme ? classes.Bio : classes.BioLight}>
      <div className={classes.Left}>
        <div className={classes.Image}>
          <img src={userImage} alt="display " />
        </div>
        <div className={classes.Name}>
          <div className={classes.UserName}>{username}</div>
          <div className={classes.Job}>
            {job.length > 0
              ? `${job[0].role} @${job[0].company && job[0].company}`
              : "No_Job"}
          </div>
        </div>
      </div>
      <blockquote>{bio}</blockquote>
    </div>
  );
};

export default Bio;
