import React, { useState } from "react";
import PaginationButtons from "../components/ui/paginationButtons";
import Articles from "../components/ui/articles/articles";
import HomeContent from "../components/ui/HomeContentMain";
import { useEffect } from "react";
import { GET_BLOGS } from "../redux/actions/blogs/blogsAction";
import Spinner from "../components/ui/spinner/spinner";
import { connect } from "react-redux";

import Pagination, { resultsPerPage } from "../logic/pagination";
const Home = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    props.getBlogs();
    console.log(props);
  }, []);
  if (props.blogs) {
    console.log(props.blogs);
  }

  const nextPageHandler = () => {
    setCurrentPage((prev) => prev + 1);
    console.log(currentPage);
  };
  const prevPageHandler = () => {
    setCurrentPage((prev) => prev - 1);
  };
  if (props.blogs) {
    console.log(props.blogs);
  }
  let content = null;
  if (props.loading) {
    content = (
      <div
        style={{
          minHeight: "10rem",
          display: "grid",
          placeItems: "center",
          marginTop: "10rem",
        }}
      >
        <Spinner />
      </div>
    );
  }
  if (props.blogs) {
    if (props.blogs.length === 0) {
      content = (
        <div
          style={{
            color: "white",
            minHeight: "10rem",
            textAlign: "center",
            marginTop: "10rem",
          }}
        >
          We don't have any blogs yet pls proceed to posting of blogs by
          creating an account. You can watch a video on how to do that
        </div>
      );
    }
    if (props.blogs.length > 0) {
      content = (
        <>
          <Articles
            datas={Pagination(props.blogs, currentPage)}
            title="Latest Blogs"
          />
          <PaginationButtons
            articles={props.blogs}
            resultsPerPage={resultsPerPage}
            currentPage={currentPage}
            nextPageHandler={nextPageHandler}
            prevPageHandler={prevPageHandler}
          />
        </>
      );
    }
  }

  return (
    <div>
      <HomeContent />

      {content}
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
// const datas = [
//   {
//     id: 1,
//     tags: ["Photos", "Ionic", "Android"],
//     body: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
//     reading_time: 2,
//   },
//   {
//     id: 2,
//     tags: ["Photos", "Ionic", "Android"],
//     body: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
//     reading_time: 2,
//   },
//   {
//     id: 3,
//     tags: ["Photos", "Ionic", "Android"],
//     body: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
//     reading_time: 2,
//   },
//   {
//     id: 4,
//     tags: ["Photos", "Ionic", "Android"],
//     body: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
//     reading_time: 2,
//   },
//   {
//     id: 8,
//     tags: ["Photos", "Ionic", "Android"],
//     body: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
//     reading_time: 2,
//   },
//   {
//     id: 7,
//     tags: ["Photos", "Ionic", "Android"],
//     body: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
//     reading_time: 2,
//   },
//   {
//     id: 6,
//     tags: ["Photos", "Ionic", "Android"],
//     body: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
//     reading_time: 2,
//   },
//   {
//     id: 5,
//     tags: ["Photos", "Ionic", "Android"],
//     body: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
//     reading_time: 2,
//   },
//   {
//     id: 9,
//     tags: ["Photos", "Ionic", "Android"],
//     body: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
//     reading_time: 2,
//   },
//   {
//     id: 10,
//     tags: ["Photos", "Ionic", "Android"],
//     body: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
//     reading_time: 2,
//   },
//   {
//     id: 11,
//     tags: ["Photos", "Ionic", "Android"],
//     body: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
//     reading_time: 2,
//   },
//   {
//     id: 12,
//     tags: ["Photos", "Ionic", "Android"],
//     body: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
//     reading_time: 2,
//   },
// ];
