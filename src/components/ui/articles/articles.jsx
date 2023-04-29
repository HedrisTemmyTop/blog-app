import React, { useContext } from "react";
import classes from "../../../styles/Articles.module.css";
import Box from "./Box";
import { ThemeContext } from "../../../context/context";
import { Link } from "react-router-dom";
const Articles = ({ datas, title, button, username = "" }) => {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <React.Fragment>
      <div className={classes.Articles}>
        <div className={classes.ArticleHead}>
          <div
            className={classes.Head}
            style={darkTheme ? { color: "#fff" } : { color: "#000" }}
          >
            {title}
          </div>

          {/* <Link to="">Bookmarked</Link> */}
          {/* {button ? (
            <>
              <div className={classes.Btns}>
                <Link to="latest">Latest</Link>
                <Link to="published" className={classes.Special}>
                  Published
                </Link>
                <Link to="drafted">Drafted</Link>
              </div>
              <Link to="/post-blog" className={classes.CreateButton}>
                Create Blog
              </Link>
            </>
          ) : null} */}
        </div>
        <div className={classes.Container}>
          <div className={classes.Boxes}>
            {datas.map((data, i) => {
              return (
                <Box data={data} key={i} button={button} username={username} />
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Articles;
