import React, { useState } from "react";
import PaginationButtons from "../components/ui/paginationButtons";
import Articles from "../components/ui/articles/articles";
import HomeContent from "../components/ui/HomeContentMain";
import { useEffect } from "react";
import { GET_BLOGS } from "../redux/actions/blogs/blogsAction";
import Spinner from "../components/ui/spinner/spinner";
import { useDispatch, useSelector } from "react-redux";
import Pagination, { resultsPerPage } from "../logic/pagination";
import axios from "axios";
import API_URL from "../api/URL";
import { useContext } from "react";
import { ThemeContext } from "../context/context";
import arrangeBlogs from "../logic/arrangeBlogs";
import { sortBlogInLatest } from "../logic/sortBlogs";
const Home = () => {
  // Component states and variables

  const [currentPage, setCurrentPage] = useState(1);
  const [sortedBlogs, setSortedBlogs] = useState(null);
  const [filterBlogs, setFilterBlogs] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const { darkTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  const { blogs, loading, error } = useSelector((state) => state.blogs);

  // Getting blogs
  useEffect(() => {
    dispatch(GET_BLOGS());
  }, [dispatch]);
  // console.log(result);

  // Runs when there's blogs to sort(either filtered blog or response bloh) the blog before displaying
  useEffect(() => {
    const searchHistory = JSON.parse(localStorage.getItem("searchHistory"));

    if (filterBlogs) {
      const sortData = arrangeBlogs(
        sortBlogInLatest(filterBlogs),
        searchHistory?.length ? searchHistory : [""]
      );
      console.log(sortData);
      setSortedBlogs(sortData);
    }
    if (blogs && !filterBlogs) {
      // console.log(blogs);

      const sortData = arrangeBlogs(
        sortBlogInLatest(blogs),
        searchHistory?.length ? searchHistory : [""]
      );
      setSortedBlogs(sortData, searchHistory);
      console.log(sortData);
    }
  }, [blogs, filterBlogs]);

  const searchBlogHandler = async (value) => {
    try {
      const response = await axios.get(API_URL + "blogs?search=" + value);

      setFilterBlogs(response.data.posts);
    } catch (error) {
      setSearchError(error.message);
    }
  };

  const nextPageHandler = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const prevPageHandler = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const handleReload = () => {
    window.location.reload();
  };

  let content = null;
  if (loading) {
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
  if (sortedBlogs) {
    if (sortedBlogs.length === 0) {
      content = (
        <div
          style={
            darkTheme
              ? {
                  color: "white",
                  minHeight: "10rem",
                  textAlign: "center",
                  marginTop: "10rem",
                }
              : {
                  color: "#111926",
                  minHeight: "10rem",
                  textAlign: "center",
                  marginTop: "10rem",
                }
          }
        >
          We don't have any blogs yet pls proceed to posting of blogs by
          creating an account. You can watch a video on how to do that
        </div>
      );
    }
    if (sortedBlogs.length > 0) {
      content = (
        <>
          <Articles
            datas={Pagination(sortedBlogs, currentPage)}
            title="Latest Blogs"
          />
          <PaginationButtons
            articles={sortedBlogs}
            resultsPerPage={resultsPerPage}
            currentPage={currentPage}
            nextPageHandler={nextPageHandler}
            prevPageHandler={prevPageHandler}
          />
        </>
      );
    }
  }
  if (error || searchError)
    content = (
      <div
        style={
          darkTheme
            ? {
                color: "#fff",
                display: "grid",
                placeItems: "center",
                paddingTop: "2rem",
              }
            : {
                color: "#111926",
                display: "grid",
                placeItems: "center",
                paddingBlock: "6rem",
              }
        }
      >
        <span>
          An error occured
          <button
            onClick={handleReload}
            style={{
              padding: "1rem 2rem",
              fontSize: "1.4rem",
              borderRadius: ".5rem",
              marginLeft: "1rem",
            }}
          >
            Tap to reload
          </button>
        </span>
      </div>
    );
  return (
    <div>
      <HomeContent search={searchBlogHandler} />

      {content}
    </div>
  );
};

export default Home;
