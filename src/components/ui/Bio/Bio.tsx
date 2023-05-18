import classes from "../../../styles/Profile.module.css";
import { useContext } from "react";
import { ThemeContext } from "../../../context/context";
import { BsGithub, BsLinkedin, BsTwitter, BsGlobe } from "react-icons/bs";
import { BioInterface } from "../../../Interface/ProfileInterface";

const Bio = (props: BioInterface) => {
  const { username, job, userImage, bio, socialHandles } = props;
  const { darkTheme } = useContext(ThemeContext);
  const handleDisplayJob = () => {
    const { role, company } = job[0];
    if (role && company) return `${role} @${company}`;

    if (role && !company) return `${role}`;
    if (!role && company) return `Works @${company}`;
    if (!role && !company) return `No_Job`;
  };
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
              {job.length > 0 ? handleDisplayJob() : "No_Job"}
            </div>
          </div>
        </div>
        <blockquote>{bio}</blockquote>
      </div>
      {socialHandles && (
        <div className={classes.Icons}>
          <div className={classes.Icon}>
            {socialHandles.map((handle) => {
              if (handle.name === "github" && handle.url)
                return (
                  <a
                    href={handle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={handle.name}
                    data-testid="github"
                  >
                    <BsGithub />
                  </a>
                );
              if (handle.name === "twitter" && handle.url)
                return (
                  <a
                    href={handle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={handle.name}
                    data-testid="twitter"
                  >
                    <BsTwitter />
                  </a>
                );
              if (handle.name === "linkeldn" && handle.url)
                return (
                  <a
                    href={handle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={handle.name}
                    data-testid="linkeldn"
                  >
                    <BsLinkedin />
                  </a>
                );
              if (handle.name === "website" && handle.url)
                return (
                  <a
                    href={handle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={handle.name}
                    data-testid="website"
                  >
                    <BsGlobe />
                  </a>
                );

              return false;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Bio;
