import classes from "../styles/Authors.module.css";
import img from "../assets/default_img.jpeg";
import { BsShare, BsArrowDown } from "react-icons/bs";
import { useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "../context/context";
const Authors = () => {
  const authorsArray = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  const { darkTheme } = useContext(ThemeContext);
  const [authorFirstTen, setAuthorsFirstTen] = useState(
    authorsArray.slice(0, 5)
  );

  const handleViewAll = () => {
    setAuthorsFirstTen(authorsArray);
  };
  return (
    <div className={darkTheme ? classes.Authors : classes.AuthorsLight}>
      <form>
        <input type="search" placeholder="Search an author" />
      </form>

      <main className={classes.AuthorsList}>
        <ul>
          {authorFirstTen.map((author, i) => (
            <div
              key={i}
              className={darkTheme ? classes.ListBody : classes.ListBodyLight}
            >
              <li
                style={
                  i === authorFirstTen.length - 1 ? { borderBottom: "0" } : null
                }
              >
                <div className={classes.Container}>
                  <img src={img} alt="user" />
                  <span>
                    <div>Josh morison</div>
                    <div>Frontend dev @Cavista</div>
                  </span>
                </div>
                <div>
                  <BsShare />
                </div>
              </li>
            </div>
          ))}
        </ul>
        {authorFirstTen.length !== authorsArray.length && (
          <button onClick={handleViewAll}>
            <div>
              <span>View All</span> <BsArrowDown />
            </div>
          </button>
        )}
      </main>
    </div>
  );
};

export default Authors;
