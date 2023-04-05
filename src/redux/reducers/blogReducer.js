import axios from "axios";
import API_URL from "../../api/URL";
const initialState = {
  loading: false,
  success: false,
  error: null,
  mssg: null,
};

const POST_START = () => {
  return {
    type: "SENDING",
  };
};
const POST_SUCCESS = (data) => {
  return {
    type: "SUCCESS",
    data,
  };
};
const POST_FAIL = (data) => {
  return {
    type: "FAILED",
    data,
  };
};
export const POST_BLOG_REQUEST = (html, token) => {
  return async (dispatch) => {
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

const blogReducer = (state = initialState, action) => {
  if (action.type === "SENDING")
    return { loading: true, success: false, error: null };
  if (action.type === "SUCCESS")
    return {
      loading: false,
      success: true,
      mssg: action.data,
      error: null,
    };
  if (action.type === "FAILED") {
    console.log(action);
    return {
      loading: false,
      success: false,
      error: action.error,
    };
  }
  return state;
};

export default blogReducer;
