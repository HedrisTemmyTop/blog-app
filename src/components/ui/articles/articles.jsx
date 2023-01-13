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

import Updates from "./updates";
import { ThemeContext } from "../../../context/context";
const Articles = (props) => {
  const darkTheme = useContext(ThemeContext);
  useEffect(() => {
    props.getBlogs();
    console.log(props);
  }, []);
  if (props.blogs) {
    console.log(props.blogs);
  }
  const datas = [
    {
      id: 1,
      tags: ["Photos", "Ionic", "Android"],
      body: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
      reading_time: 2,
    },
    {
      id: 2,
      tags: ["Photos", "Ionic", "Android"],
      body: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
      reading_time: 2,
    },
    {
      id: 3,
      tags: ["Photos", "Ionic", "Android"],
      body: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
      reading_time: 2,
    },
    {
      id: 4,
      tags: ["Photos", "Ionic", "Android"],
      body: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
      reading_time: 2,
    },
  ];
  return (
    <div className={classes.Articles}>
      <div
        className={classes.Head}
        style={darkTheme ? { color: "#fff" } : { color: "#000" }}
      >
        Latest Articles
      </div>
      <div className={classes.Container}>
        <div className={classes.Boxes}>
          {
            // props.blog            ? props.blogs.map((data, i) => {
            //       return <Box data={data} key={i} />;
            //     })
            //   :
            datas.map((data, i) => {
              return <Box data={data} key={i} />;
            })
          }
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
