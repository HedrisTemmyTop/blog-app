import {
  Blogs,
  CreateNewPost,
  EditPost,
  Home,
  Premium,
  Profile,
} from "../pages";
import React from "react";

interface RouteObj {
  id: String;
  path: String;
  element: React.ReactElement;
}

export const routes: RouteObj[] = [
  { id: "home-page", path: "/", element: <Home /> },
  { id: "home-page-search", path: "/search", element: <Home /> },
  { id: "subscribe", path: "/premium", element: <Premium /> },
];

export const protectedRoutes: RouteObj[] = [
  { id: "create-new-post", path: "/post-blog", element: <CreateNewPost /> },
  { id: "profile", path: "/profile/:id", element: <Profile /> },
  { id: "edit-blog", path: "/edit-blog/:id", element: <EditPost /> },
  { id: "blog", path: "/blog/:id", element: <Blogs /> },
  {
    id: "account-settings",
    path: "profile/account-settings",
    element: <Blogs />,
  },
];
