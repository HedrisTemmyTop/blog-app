import API_URL from "../../../api/URL";
import axios from "axios";
const FETCH_START = () => {
  return {
    type: "FETCH_START",
  };
};

const FETCH_SUCCESS = (data) => {
  return {
    type: "FETCH_SUCCESS",
    data,
  };
};

const FETCH_FAIL = (error) => {
  return {
    type: "FETCH_FAIL",
    error,
  };
};
const FETCH_BLOG_SUCCESS = (blog) => {
  return {
    type: "FETCH_BLOG_SUCCESS",
    blog,
  };
};
export const GET_BLOGS = () => {
  return function (dispatch) {
    dispatch(FETCH_START());
    axios
      .get(`${API_URL}blogs`)
      .then((response) => dispatch(FETCH_SUCCESS(response.data.posts)))
      .catch((err) => dispatch(FETCH_FAIL(err)));
  };
};
export const GET_BLOG = (id) => {
  return function (dispatch) {
    dispatch(FETCH_START());
    axios
      .get(`${API_URL}blog/:${id}`)
      .then((response) => dispatch(FETCH_BLOG_SUCCESS(response.data.posts)))
      .catch((err) => {
        console.log(err);
        dispatch(FETCH_FAIL(err));
      });
  };
};
