import classes from "../../../styles/Profile.module.css";
import { useContext } from "react";
import { ThemeContext } from "../../../context/context";
import { BsGithub, BsLinkedin, BsTwitter, BsGlobe } from "react-icons/bs";

const Bio = ({ username, job, userImage, bio, socialHandles }) => {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <div className={darkTheme ? classes.Bio : classes.BioLight}>
      <div className={classes.BioMain}>
        <div className={classes.Left}>
          <div className={classes.Image}>
            <img src={userImage} alt="display " />
          </div>
          <div className={classes.Name}>
            <div className={classes.UserName}>{username}</div>
            <div className={classes.Job}>
              {job.length > 0 &&
                job[0].role &&
                !job[0].role !== "" &&
                `${job[0].role} @${job[0].company && job[0].company}`}
              {job.length > 0 &&
                job[0].role === "" &&
                job[0].company !== "" &&
                `Works @${job[0].company}`}
              {job.length === 0 ||
                (job[0].role === "" && job[0].company === "" && "No_Job")}
            </div>
          </div>
        </div>
        <blockquote>{bio}</blockquote>
      </div>
      {socialHandles && (
        <div className={classes.Icons}>
          <div className={classes.Icon}>
            {socialHandles.map((handle) => {
              if (handle.name === "github")
                return (
                  <a
                    href={handle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={handle.name}
                  >
                    <BsGithub />
                  </a>
                );
              if (handle.name === "twitter")
                return (
                  <a
                    href={handle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={handle.name}
                  >
                    <BsTwitter />
                  </a>
                );
              if (handle.name === "linkeldn")
                return (
                  <a
                    href={handle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={handle.name}
                  >
                    <BsLinkedin />
                  </a>
                );
              if (handle.name === "website")
                return (
                  <a
                    href={handle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={handle.name}
                  >
                    <BsGlobe />
                  </a>
                );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Bio;
