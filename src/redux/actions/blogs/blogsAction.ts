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
} from "..";
export const GET_BLOGS = () => {
  return function (dispatch: any) {
    dispatch(FETCH_START());
    axios
      .get(`${API_URL}blogs`)
      .then((response) => {
        return dispatch(FETCH_SUCCESS(response.data.posts));
      })
      .catch((err) => {
        return dispatch(FETCH_FAIL(err));
      });
  };
};
export const GET_BLOG = (id: string) => {
  return function (dispatch: any) {
    dispatch(FETCH_START());
    axios
      .get(`${API_URL}blogs/${id}`)
      .then((response) => {
        dispatch(FETCH_BLOG_SUCCESS(response.data));
      })
      .catch((err) => {
        dispatch(FETCH_FAIL(err));
      });
  };
};

export const POST_BLOG_REQUEST = (html: any, token: string) => {
  console.log(token);
  return async (dispatch: any) => {
    dispatch(POST_START());
    console.log(html);
    axios
      .post(API_URL + "blogs", html, {
        headers: {
          // "Content-Type": "Application.json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(POST_SUCCESS(response));
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          POST_FAIL(error.response ? error.response.data : error.message)
        );
      });
  };
};
