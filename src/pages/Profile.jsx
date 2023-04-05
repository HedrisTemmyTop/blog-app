import React, { useState } from "react";
import PaginationButtons from "../components/ui/paginationButtons";
import Articles from "../components/ui/articles/articles";
import HomeContent from "../components/ui/HomeContentMain";
import { useEffect } from "react";
import { GET_BLOGS } from "../redux/actions/blogs/blogsAction";
import { connect, useDispatch, useSelector } from "react-redux";
import Bio from "../components/ui/Bio/Bio";
import Pagination, { resultsPerPage } from "../logic/pagination";
import Spinner from "../components/ui/spinner/spinner";
import { useNavigate, useParams } from "react-router-dom";
import { GET_USER_PROFILE } from "../redux/reducers/profileReducer";
const Profile = (props) => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const { loading, user, error } = useSelector((state) => state.user_profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (token && id) {
      console.log(token);
      dispatch(GET_USER_PROFILE(id, token));
    } else return navigate("/");
  }, []);
  if (props.blogs || user) {
    console.log(props.blogs, user);
  }
  const [currentPage, setCurrentPage] = useState(1);

  const nextPageHandler = () => {
    setCurrentPage((prev) => prev + 1);
    console.log(currentPage);
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
  if (user && !loading)
    content = (
      <div>
        <Bio username={user.user.username} />
        <Articles
          datas={Pagination(user.posts, currentPage)}
          title="Your Blogs"
          button={true}
        />
        <PaginationButtons
          articles={user.posts}
          resultsPerPage={resultsPerPage}
          currentPage={currentPage}
          nextPageHandler={nextPageHandler}
          prevPageHandler={prevPageHandler}
        />
      </div>
    );
  if (error) content = <div>An error occured</div>;
  return content;
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
