import axios from "axios";
import API_URL from "../../api/URL";
const GETTING_VISITING_PROFILE = () => {
  return {
    type: "GETTING_VISITING_PROFILE",
  };
};

const VISITING_USER_PROFILE_FOUND = (user: {}) => {
  return {
    type: "VISITING_USER_PROFILE_FOUND",
    user: user,
  };
};

const VISITING_USER_PROFILE_ERROR = (error: string) => {
  return {
    type: "VISITING_USER_PROFILE_ERROR",
    error: error,
  };
};
export const GET_VISITING_USER_PROFILE = (id: string, token: string) => {
  return (dispatch: any) => {
    dispatch(GETTING_VISITING_PROFILE());
    axios
      .get(API_URL + "users/profile/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => dispatch(VISITING_USER_PROFILE_FOUND(res.data)))
      .catch((err) => {
        return dispatch(VISITING_USER_PROFILE_ERROR("user not found"));
      });
  };
};

const initialState = {
  loading: false,
  user: null,
  error: null,
};
interface Action {
  type: string;
  user?: any;
  blog?: any;
  comment: [];
  error?: string;
}
const visitingUserProfileStore = (state = initialState, action: Action) => {
  if (action.type === "GETTING_VISITING_PROFILE") {
    return { loading: true };
  }
  if (action.type === "VISITING_USER_PROFILE_FOUND") {
    return {
      loading: false,
      user: action.user,
      error: null,
    };
  }
  if (action.type === "VISITING_USER_PROFILE_ERROR") {
    return {
      loading: false,
      user: null,
      error: action.error,
    };
  }
  return state;
};

export default visitingUserProfileStore;
