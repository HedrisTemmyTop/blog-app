import React, { useState } from "react";
import PaginationButtons from "../components/ui/paginationButtons";
import Articles from "../components/ui/articles/articles";
import defaultImage from "../assets/default_img.jpeg";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Bio from "../components/ui/Bio/Bio";
import Pagination, { resultsPerPage } from "../logic/pagination";
import Spinner from "../components/ui/spinner/spinner";
import { useNavigate, useParams } from "react-router-dom";
import { GET_USER_PROFILE } from "../redux/reducers/profileReducer";
import { useContext } from "react";
import { ThemeContext } from "../context/context";
import {
  filterByDrafted,
  filterByLength,
  filterByPublished,
  filterByRelevant,
  sortBlogInLatest,
} from "../logic/sortBlogs";
import { DataTypes, UserProfileTypes } from "../Interface/ProfileInterface";
const UserProfile = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const userId: string | undefined = localStorage.getItem("userId")!;

  const { loading, user, error } = useSelector(
    (state: UserProfileTypes) => state.user_profile
  );

  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const { darkTheme } = useContext(ThemeContext);
  const [sortedBlogs, setSortedBlogs] = useState<DataTypes[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect(() => {
    if (token && id && userId) {
      dispatch(GET_USER_PROFILE(userId, token));
    } else navigate("/sign-in");
  }, []);

  useEffect(() => {
    if (user) {
      const { posts } = user;
      let sortData = [];
      const path = window.location.pathname.split("/");
      const data: string | null = localStorage.getItem("searchHistory");
      const searchHistory: string[] = data
        ? (JSON.parse(data) as string[])
        : [];

      if (path.includes("latest")) sortData = sortBlogInLatest(posts);
      else if (path.includes("published")) sortData = filterByPublished(posts);
      else if (path.includes("drafted")) sortData = filterByDrafted(posts);
      else if (path.includes("longest")) sortData = filterByLength(posts);
      else if (path.includes("relevant"))
        sortData = filterByRelevant(posts, searchHistory);
      else if (path.includes("most-viewed"))
        sortData = filterByRelevant(posts, searchHistory);
      else if (path.includes("ratings"))
        sortData = filterByRelevant(posts, searchHistory);
      else sortData = sortBlogInLatest(posts);
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
          socialHandles={userData.socialHandle && userData.socialHandle}
          bio={userData.bio ? userData.bio : "No bio"}
        />
        {sortedBlogs.length > 0 ? (
          <Articles
            datas={Pagination(sortedBlogs, currentPage)}
            title="Your Blogs"
            button={true}
            profileImage={userData.profileImage}
            username={userData.username}
            userId={id}
            viewerId={userId}
          />
        ) : (
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
            No blogs
          </div>
        )}

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
