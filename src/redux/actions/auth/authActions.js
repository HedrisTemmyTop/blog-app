import axios from "axios";
import {
  REGISTER_START,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
} from "../actions";

export const GET_USER = (data) => {
  return function (dispatch) {
    dispatch(REGISTER_START());
    console.log(data);
    axios
      .post("https://skyreal-blog-app.cyclic.app/users/login", data)
      .then((response) => {
        console.log(response.data);

        return dispatch(LOGIN_SUCCESS(response.data));
      })
      .catch((err) => {
        dispatch(REGISTER_FAIL(err.response ? err.response.data : err.message));
      });
  };
};

export const REGISTER_USER = (data) => {
  return function (dispatch) {
    dispatch(REGISTER_START());
    console.log(data);
    axios
      .post("https://skyreal-blog-app.cyclic.app/users/", data)
      .then((response) => {
        return dispatch(REGISTER_SUCCESS(response.data.userid));
      })
      .catch((err) => {
        console.log(err);
        dispatch(REGISTER_FAIL(err.response ? err.response.data : err.message));
      });
  };
};
