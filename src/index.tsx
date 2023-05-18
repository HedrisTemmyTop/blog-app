import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { authReducer } from "./redux/reducers/authReducer";
import { rootReducer } from "./redux/reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import blogReducer from "./redux/reducers/blogReducer";
import userProfileStore from "./redux/reducers/profileReducer";
import visitingUserProfileStore from "./redux/reducers/visitingUserProfile";
const composeEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const reducer = combineReducers({
  blogs: rootReducer,
  auth: authReducer,
  post_blog: blogReducer,
  user_profile: userProfileStore,
  visiting_profile: visitingUserProfileStore,
});
const store = createStore(reducer, composeEnhancer);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
