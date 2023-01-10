import React, { useEffect } from "react";
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

import Updates from "./updates";
const Articles = (props) => {
  useEffect(() => {
    props.getBlogs();
    console.log(props);
  }, []);
  if (props.blogs) {
    console.log(props.blogs);
  }
  return (
    <div className={classes.Articles}>
      <div className={classes.Head}>Latest Articles</div>
      <div className={classes.Container}>
        <div className={classes.Boxes}>
          {props.blogs
            ? props.blogs.map((data, i) => {
                return <Box data={data} key={i} />;
              })
            : null}
        </div>
        {/* <Updates data={props.popular} /> */}
      </div>
    </div>
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
