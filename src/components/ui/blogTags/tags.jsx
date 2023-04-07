import classes from "../../../styles/Blog.module.css";

import { Link } from "react-router-dom";
const Tags = ({ tag, index }) => {
  return (
    <div className={classes.Tag}>
      <Link to={"/tag/#" + tag} key={index}>
        {tag}
      </Link>
    </div>
  );
};

export default Tags;
