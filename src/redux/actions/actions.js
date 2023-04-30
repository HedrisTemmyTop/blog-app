// import axios from "axios";

// const AUTH_START = () => {
//   return {
//     type: "AUTH_START",
//   };
// };
// const AUTH_SUCCESS = (data) => {
//   return {
//     type: "AUTH_SUCCES",
//     data,
//   };
// };
// const AUTH_FAIL = (err) => {
//   return {
//     type: "AUTH_SUCCES",
//     err,
//   };
// };

// export const GET_AUTH = (data) => {
//   return function (dispatch) {
//     dispatch(AUTH_START());
//     axios
//       .post("https://skyreal-blog-app.cyclic.app/", data)
//       .then((response) => {
//         return dispatch(AUTH_SUCCESS(response.data));
//       })
//       .catch((err) => {
//         console.log(err);
//         AUTH_FAIL(err);
//       });
//   };
// };
export const FETCH_START = () => {
  return {
    type: "FETCH_START",
  };
};

export const FETCH_SUCCESS = (data) => {
  return {
    type: "FETCH_SUCCESS",
    data,
  };
};

export const FETCH_FAIL = (error) => {
  return {
    type: "FETCH_FAIL",
    error,
  };
};
export const FETCH_BLOG_SUCCESS = (blog) => {
  return {
    type: "FETCH_BLOG_SUCCESS",
    blog,
  };
};
export const POST_START = () => {
  return {
    type: "SENDING",
  };
};
export const POST_SUCCESS = (data) => {
  return {
    type: "SUCCESS",
    data,
  };
};
export const POST_FAIL = (error) => {
  return {
    type: "FAILED",
    error,
  };
};
export const RESET_AUTH_STATE = () => {
  return {
    type: "RESET_AUTH_STATE",
  };
};
export const REGISTER_START = () => {
  return {
    type: "REGISTER_START",
  };
};
export const REGISTER_SUCCESS = (data) => {
  return {
    type: "REGISTER_SUCCES",
    data,
  };
};
export const REGISTER_FAIL = (error) => {
  return {
    type: "REGISTER_FAIL",
    error,
  };
};
export const LOGIN_SUCCESS = (data) => {
  return {
    type: "LOGIN_SUCCESS",
    data,
  };
};
export const SET_TIMEOUT = () => {
  return {
    type: "SET_TIMEOUT",
  };
};
