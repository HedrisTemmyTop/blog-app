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
const composeEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const reducer = combineReducers({
  blogs: rootReducer,
  auth: authReducer,
  post_blog: blogReducer,
  user_profile: userProfileStore,
});
const store = createStore(reducer, composeEnhancer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
