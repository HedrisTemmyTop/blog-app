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
  const darkTheme = useContext(ThemeContext);
  const totalPages = Math.ceil(articles.length / resultsPerPage);
  let buttonContent = null;
  const increasePaginationHandler = () => {
    console.log("hello");
  };
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
              border: "0",
              backgroundColor: "transparent",
              color: "black",
            }}
          >
            <span style={{ marginLeft: "10px" }}>Prev</span>
          </div>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>

          <div>
            <span style={{ marginRight: "10px" }} onClick={nextPageHandler}>
              Next
            </span>
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
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>

          <div
            style={{
              border: "0",
              backgroundColor: "transparent",
              color: "black",
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
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          {}
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
