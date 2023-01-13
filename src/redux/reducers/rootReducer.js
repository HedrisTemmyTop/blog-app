import img1 from "../../assets/Rectangle 12.png";
import img2 from "../../assets/Rectangle 6.png";
import img3 from "../../assets/Rectangle 11.png";
import img4 from "../../assets/Rectangle 4.png";
import user from "../../assets/Ellipse.png";
import popular1 from "../../assets/Frame 73.png";
import popular2 from "../../assets/Frame55.png";
import popular3 from "../../assets/Frame 74.png";
import { act } from "react-dom/test-utils";

const initialState = {
  blogs: null,
  text: 'I want to preface this article by saying that the vulnerability we will be discussing does not mean that a "hybrid" application built with Capacitor/Cordova is insecure. This vulnerability is also not limited to Capacitor/Cordova, it would apply to any nativeapplication that uses a web view that implements a Javascript interface, or "bridge", from the web view to Native APIs.',
  blog: null,
  loading: false,
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
    console.log(action);
    return { ...state, loading: false, blog: action.blog };
  }

  return state;
};
