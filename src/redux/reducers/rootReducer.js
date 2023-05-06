const initialState = {
  blogs: null,
  text: 'I want to preface this article by saying that the vulnerability we will be discussing does not mean that a "hybrid" application built with Capacitor/Cordova is insecure. This vulnerability is also not limited to Capacitor/Cordova, it would apply to any nativeapplication that uses a web view that implements a Javascript interface, or "bridge", from the web view to Native APIs.',
  blog: null,
  loading: false,
  comment: [],
  error: null,
};
export const rootReducer = (state = initialState, action) => {
  if (action.type === "FETCH_START") {
    return {
      ...state,
      loading: true,
    };
  }
  if (action.type === "FETCH_SUCCESS") {
    return {
      ...state,
      loading: false,
      blogs: action.data,
    };
  }
  if (action.type === "FETCH_FAIL") {
    return { ...state, loading: false, error: action.error };
  }
  if (action.type === "FETCH_BLOG_SUCCESS") {
    return {
      ...state,
      loading: false,
      blog: action.blog,
      comment: action.comment,
    };
  }

  return state;
};
