import React, { useContext } from "react";
import classes from "../../styles/Home.module.css";
import next from "../../assets/Vector.svg";
import prev from "../../assets/Vector1.svg";
import { ThemeContext } from "../../context/context";
import { DataTypes } from "../../Interface/ProfileInterface";

interface PropTypes {
  articles: DataTypes[];
  resultsPerPage: number;
  currentPage: number;
  nextPageHandler: () => void;
  prevPageHandler: () => void;
}
const PaginationButtons = (props: PropTypes): JSX.Element | null => {
  const {
    articles,
    resultsPerPage,
    currentPage,
    nextPageHandler,
    prevPageHandler,
  } = props;
  const { darkTheme } = useContext(ThemeContext);
  const totalPages = Math.ceil(articles.length / resultsPerPage);
  let buttonContent: JSX.Element | null = null;

  if (currentPage === 1 && totalPages > 1) {
    return (buttonContent = (
      <div className={classes.Pagination}>
        <div
          className={[
            classes.PaginateButtons,
            darkTheme
              ? classes.PaginateButtonsDark
              : classes.PaginateButtonsLight,
          ].join(" ")}
        >
          <button
            disabled={true}
            style={{
              backgroundColor: "transparent",
              color: "#2930e3",
              border: "1px solid #2930e3",
            }}
          >
            <span style={{ marginLeft: "10px" }}>Prev</span>
          </button>

          <div onClick={nextPageHandler}>
            <span style={{ marginRight: "10px" }}>Next</span>
            <img src={next} alt="next" />
          </div>
        </div>
      </div>
    ));
  }
  if (currentPage === totalPages && totalPages > 1) {
    return (buttonContent = (
      <div className={classes.Pagination}>
        <div
          className={[
            classes.PaginateButtons,
            darkTheme
              ? classes.PaginateButtonsDark
              : classes.PaginateButtonsLight,
          ].join(" ")}
        >
          <button onClick={prevPageHandler}>
            <img src={prev} alt="prev" />
            <span style={{ marginLeft: "10px" }}>Prev</span>
          </button>

          <button
            style={{
              backgroundColor: "transparent",
              color: "#2930e3",
              border: "1px solid #2930e3",
            }}
            disabled={true}
          >
            <span style={{ marginRight: "10px" }}>Next</span>
          </button>
        </div>
      </div>
    ));
  }
  if (currentPage < totalPages) {
    return (buttonContent = (
      <div className={classes.Pagination}>
        <div
          className={[
            classes.PaginateButtons,
            darkTheme
              ? classes.PaginateButtonsDark
              : classes.PaginateButtonsLight,
          ].join(" ")}
        >
          <div onClick={prevPageHandler}>
            <img src={prev} alt="prev" />
            <span style={{ marginLeft: "10px" }}>Prev</span>
          </div>

          <div onClick={nextPageHandler}>
            <span style={{ marginRight: "10px" }}>Next</span>
            <img src={next} alt="next" />
          </div>
        </div>
      </div>
    ));
  }

  return buttonContent;
};

export default PaginationButtons;
