import React, { useContext, useEffect } from "react";
import classes from "../../../styles/Articles.module.css";
import Box from "./Box";
import img1 from "../../../assets/Rectangle 12.png";
import img2 from "../../../assets/Rectangle 6.png";
import img3 from "../../../assets/Rectangle 11.png";
import img4 from "../../../assets/Rectangle 4.png";
import user from "../../../assets/Ellipse.png";
import popular1 from "../../../assets/Frame 73.png";
import popular2 from "../../../assets/Frame55.png";
import popular3 from "../../../assets/Frame 74.png";

import { connect } from "react-redux";
import { GET_BLOGS } from "../../../redux/actions/blogs/blogsAction";

import { ThemeContext } from "../../../context/context";
import { Link } from "react-router-dom";
const Articles = ({ datas, title, button }) => {
  const darkTheme = useContext(ThemeContext);

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
          {button ? (
            <Link to="/post-blog" className={classes.CreateButton}>
              Create Blog
            </Link>
          ) : null}
        </div>
        <div className={classes.Container}>
          <div className={classes.Boxes}>
            {datas.map((data, i) => {
              return <Box data={data} key={i} button={button} />;
            })}
          </div>
          {/* <Updates data={props.popular} /> */}
        </div>
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    blogs: state.blogs.blogs,
    loading: state.blogs.loading,
    error: state.blogs.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getBlogs: () => {
      dispatch(GET_BLOGS());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
