import API_URL from "../../../api/URL";
import axios from "axios";
import {
  FETCH_BLOG_SUCCESS,
  POST_FAIL,
  POST_START,
  POST_SUCCESS,
  FETCH_FAIL,
  FETCH_START,
  FETCH_SUCCESS,
} from "../";
export const GET_BLOGS = () => {
  return function (dispatch) {
    dispatch(FETCH_START());
    axios
      .get(`${API_URL}blogs`)
      .then((response) => {
        console.log(response);
        return dispatch(FETCH_SUCCESS(response.data.posts));
      })
      .catch((err) => {
        console.log(err);
        return dispatch(FETCH_FAIL(err));
      });
  };
};
export const GET_BLOG = (id) => {
  return function (dispatch) {
    dispatch(FETCH_START());
    axios
      .get(`${API_URL}blogs/${id}`)
      .then((response) => dispatch(FETCH_BLOG_SUCCESS(response.data.post)))
      .catch((err) => {
        console.log(err);
        dispatch(FETCH_FAIL(err));
      });
  };
};

export const POST_BLOG_REQUEST = (html, token) => {
  return async (dispatch) => {
    console.log(html, token, "hello");
    dispatch(POST_START());
    axios
      .post(API_URL + "blogs", html, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        window.location = "/blogs/" + response.data.blog._id;
        dispatch(POST_SUCCESS(response));
      })
      .catch((error) => {
        console.log(error);
        dispatch(POST_FAIL(error.message));
      });
  };
};
