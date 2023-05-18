import { Link } from "react-router-dom";

interface PropTypes {
  tag: string;
  index: number;
}
const Tags = ({ tag, index }: PropTypes) => {
  return (
    <Link to={"/tag/#" + tag} key={index}>
      {tag}
    </Link>
  );
};

export default Tags;
