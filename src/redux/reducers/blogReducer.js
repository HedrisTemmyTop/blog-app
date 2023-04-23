const initialState = {
  loading: false,
  success: false,
  error: null,
  mssg: null,
};

const blogReducer = (state = initialState, action) => {
  if (action.type === "SENDING") {
    return { loading: true, success: false, error: null };
  }
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
