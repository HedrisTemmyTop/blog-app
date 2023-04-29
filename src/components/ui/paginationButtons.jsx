import React, { useContext } from "react";
import classes from "../../styles/Home.module.css";
import next from "../../assets/Vector.png";
import prev from "../../assets/Vector1.png";
import { ThemeContext } from "../../context/context";
const PaginationButtons = ({
  articles,
  resultsPerPage,
  currentPage,
  nextPageHandler,
  prevPageHandler,
}) => {
  const { darkTheme } = useContext(ThemeContext);
  const totalPages = Math.ceil(articles.length / resultsPerPage);
  let buttonContent = null;

  console.log(totalPages);
  if (currentPage === 1 && totalPages > 1) {
    console.log("hello");
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
          <div
            disabled={true}
            style={{
              backgroundColor: "transparent",
              color: "#2930e3",
              border: "1px solid #2930e3",
            }}
          >
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
          <div onClick={prevPageHandler}>
            <img src={prev} alt="prev" />
            <span style={{ marginLeft: "10px" }}>Prev</span>
          </div>

          <div
            style={{
              backgroundColor: "transparent",
              color: "#2930e3",
              border: "1px solid #2930e3",
            }}
            disabled={true}
          >
            <span style={{ marginRight: "10px" }}>Next</span>
          </div>
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
