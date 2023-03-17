import React, { useState } from "react";
import PaginationButtons from "../components/ui/paginationButtons";
import Articles from "../components/ui/articles/articles";
import HomeContent from "../components/ui/HomeContentMain";
import { useEffect } from "react";
import { GET_BLOGS } from "../redux/actions/blogs/blogsAction";
import { connect } from "react-redux";
import Bio from "../components/ui/Bio/Bio";
import axios from "axios";
import API_URL from "../api/URL";
const Profile = (props) => {
  useEffect(() => {
    props.getBlogs();
    console.log(props);
    axios
      .get(API_URL + "user/profile/64075d2d7846cc50d8886415", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDc1ZDJkNzg0NmNjNTBkODg4NjQxNSIsImlhdCI6MTY3ODIwNDIyNSwiZXhwIjoxNjc4MjA3ODI1fQ.IvPhtzFCXnxFPs5BdZaGL7dPruwGHsP5orsSrtcNeUQ`,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
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
    {
      id: 8,
      tags: ["Photos", "Ionic", "Android"],
      body: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
      reading_time: 2,
    },
    {
      id: 7,
      tags: ["Photos", "Ionic", "Android"],
      body: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
      reading_time: 2,
    },
    {
      id: 6,
      tags: ["Photos", "Ionic", "Android"],
      body: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
      reading_time: 2,
    },
    {
      id: 5,
      tags: ["Photos", "Ionic", "Android"],
      body: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
      reading_time: 2,
    },
    {
      id: 9,
      tags: ["Photos", "Ionic", "Android"],
      body: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
      reading_time: 2,
    },
    {
      id: 10,
      tags: ["Photos", "Ionic", "Android"],
      body: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
      reading_time: 2,
    },
    {
      id: 11,
      tags: ["Photos", "Ionic", "Android"],
      body: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
      reading_time: 2,
    },
    {
      id: 12,
      tags: ["Photos", "Ionic", "Android"],
      body: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
      reading_time: 2,
    },
  ];
  const resultsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const Pagination = (page = 1) => {
    const start = (page - 1) * resultsPerPage;
    const end = page * resultsPerPage;
    const paginatedData = datas.slice(start, end);
    return paginatedData;
  };
  const nextPageHandler = () => {
    setCurrentPage((prev) => prev + 1);
    console.log(currentPage);
  };
  const prevPageHandler = () => {
    setCurrentPage((prev) => prev - 1);
  };
  return (
    <div>
      <Bio />
      <Articles
        datas={Pagination(currentPage)}
        title="Your Blogs"
        button={true}
      />
      <PaginationButtons
        articles={datas}
        resultsPerPage={resultsPerPage}
        currentPage={currentPage}
        nextPageHandler={nextPageHandler}
        prevPageHandler={prevPageHandler}
      />
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
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
