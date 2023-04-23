import classes from "../../../styles/Blog.module.css";

import { Link } from "react-router-dom";
const Tags = ({ tag, index }) => {
  return (
    <Link to={"/tag/#" + tag} key={index}>
      {tag}
    </Link>
  );
};

export default Tags;
