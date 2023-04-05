import axios from "axios";
import API_URL from "../../api/URL";
const GETTING_PROFILE = () => {
  return {
    type: "GET_PROFILE",
  };
};

const USER_PROFILE_FOUND = (user) => {
  return {
    type: "USER_PROFILE_FOUND",
    user: user,
  };
};

const USER_PROFILE_ERROR = (error) => {
  return {
    type: "USER_PROFILE_FOUND",
    error: error,
  };
};
export const GET_USER_PROFILE = (id, token) => {
  return (dispatch) => {
    dispatch(GETTING_PROFILE());
    axios
      .get(API_URL + "users/profile/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => dispatch(USER_PROFILE_FOUND(res.data)))
      .catch((err) => dispatch(USER_PROFILE_ERROR("user not found")));
  };
};

const initialState = {
  loading: false,
  user: null,
  error: null,
};
const userProfileStore = (state = initialState, action) => {
  if (action.type === "GET_PROFILE") {
    return { loading: true };
  }
  if (action.type === "USER_PROFILE_FOUND") {
    return {
      loading: false,
      user: action.user,
      error: null,
    };
  }
  if (action.type === "USER_PROFILE_ERROR") {
    return {
      loading: false,
      user: null,
      error: action.error,
    };
  }
  return state;
};

export default userProfileStore;
