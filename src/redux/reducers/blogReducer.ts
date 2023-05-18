const initialState = {
  loading: false,
  success: false,
  error: null,
  mssg: null,
};

interface Action {
  type: string;
  data?: any;
  blog?: any;

  error?: string;
}

const blogReducer = (state = initialState, action: Action) => {
  if (action.type === "RESET_STATE") {
    return {
      loading: false,
      success: false,
      error: null,
      mssg: null,
    };
  }
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
    return {
      loading: false,
      success: false,
      error: action.error,
    };
  }
  return state;
};

export default blogReducer;
