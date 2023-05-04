import React, { useState } from "react";
import PaginationButtons from "../components/ui/paginationButtons";
import Articles from "../components/ui/articles/articles";
import defaultImage from "../assets/default_img.png";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Bio from "../components/ui/Bio/Bio";
import Pagination, { resultsPerPage } from "../logic/pagination";
import Spinner from "../components/ui/spinner/spinner";
import { useNavigate, useParams } from "react-router-dom";
import { GET_USER_PROFILE } from "../redux/reducers/profileReducer";
import { useContext } from "react";
import { ThemeContext } from "../context/context";
const UserProfile = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const { loading, user, error } = useSelector((state) => state.user_profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { darkTheme } = useContext(ThemeContext);
  const [sortedBlogs, setSortedBlogs] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (token) {
      dispatch(GET_USER_PROFILE(id, token));
    } else navigate("/sign-in");
  }, []);

  useEffect(() => {
    if (user) {
      const { posts } = user;
      const sortData = posts.sort(
        (a, b) =>
          new Date(b.createdAt ? b.createdAt : b.updatedAt) -
          new Date(a.createdAt ? a.createdAt : a.updatedAt)
      );
      setSortedBlogs(sortData);
    }
  }, [user]);

  const handleReload = () => {
    window.location.reload();
  };

  const nextPageHandler = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const prevPageHandler = () => {
    setCurrentPage((prev) => prev - 1);
  };
  let content = null;
  if (loading)
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
  if (user && !loading && sortedBlogs) {
    const userData = user.user;
    content = (
      <div>
        <Bio
          username={userData.username}
          job={userData.job}
          userImage={
            userData.profileImage ? userData.profileImage : defaultImage
          }
          socialHandles={userData.socialHandle ? userData.socialHandle : null}
          bio={userData.bio ? userData.bio : "No bio"}
        />
        <Articles
          datas={Pagination(sortedBlogs, currentPage)}
          title="Your Blogs"
          button={true}
          profileImage={userData.profileImage}
          username={userData.username}
          userId={id}
          viewerId={userId}
        />
        <PaginationButtons
          articles={sortedBlogs}
          resultsPerPage={resultsPerPage}
          currentPage={currentPage}
          nextPageHandler={nextPageHandler}
          prevPageHandler={prevPageHandler}
        />
      </div>
    );
  }
  if (error)
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
  return content;
};

export default UserProfile;
