import React, { useContext } from "react";
import classes from "../../styles/Home.module.css";
import next from "../../assets/Vector.png";
import prev from "../../assets/Vector1.png";
import { ThemeContext } from "../../context/context";
const PaginationButtons = () => {
  const darkTheme = useContext(ThemeContext);
  return (
    <div className={classes.Pagination}>
      <div
        className={[
          classes.PaginateButtons,
          darkTheme
            ? classes.PaginateButtonsDark
            : classes.PaginateButtonsLight,
        ].join(" ")}
      >
        <div>
          <img src={prev} alt="prev" />
          <span style={{ marginLeft: "10px" }}>Prev</span>
        </div>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <div>
          <span style={{ marginRight: "10px" }}>Next</span>
          <img src={next} alt="next" />
        </div>
      </div>
    </div>
  );
};

export default PaginationButtons;
