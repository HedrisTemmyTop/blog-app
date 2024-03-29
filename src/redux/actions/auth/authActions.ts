import axios from "axios";
import {
  REGISTER_START,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
} from "../actions";
import { RegisterData, loginData } from "../../../Interface/AuthInterface";

export const GET_USER = (data: loginData) => {
  return function (dispatch: any) {
    dispatch(REGISTER_START());
    axios
      .post("https://skyreal-blog-app.cyclic.app/auth/login", data)
      .then((response) => {
        return dispatch(LOGIN_SUCCESS(response.data));
      })
      .catch((err) => {
        dispatch(REGISTER_FAIL(err.response ? err.response.data : err.message));
      });
  };
};

export const REGISTER_USER = (data: RegisterData) => {
  return function (dispatch: any) {
    dispatch(REGISTER_START());
    axios
      .post("https://skyreal-blog-app.cyclic.app/users/", data)
      .then((response) => {
        return dispatch(REGISTER_SUCCESS(response.data.userid));
      })
      .catch((err) => {
        dispatch(REGISTER_FAIL(err.response ? err.response.data : err.message));
      });
  };
};
