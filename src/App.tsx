import { Route, Routes } from "react-router-dom";
import React from "react";
import {
  SignUp,
  SignIn,
  Layout,
  Blogs,
  Home,
  CreateNewPost,
  Settings,
  Premium,
  EditPost,
  Profile,
  NotFound,
} from "./pages";

import { ThemeContextProvider } from "./context/context";
import Latest from "./components/sortBlogs/Latest";
import Published from "./components/sortBlogs/Published";
import Longest from "./components/sortBlogs/Longest";
import Relevant from "./components/sortBlogs/Relevant";
import Drafted from "./components/sortBlogs/Drafted";

const App: React.FC = (): JSX.Element => {
  return (
    <ThemeContextProvider>
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id" element={<Profile />}>
              <Route path="" element={<Latest />} />
              <Route path="latest" element={<Latest />} />
              <Route path="drafted" element={<Drafted />} />
              <Route path="published" element={<Published />} />
              <Route path="longest" element={<Longest />} />
              <Route path="relevant" element={<Relevant />} />
            </Route>
            <Route path="post-blog" element={<CreateNewPost />} />
            <Route path="edit-blog/:id" element={<EditPost />} />
            <Route path="blogs/:id" element={<Blogs />} />
            <Route path="search" element={<Home />} />
            <Route path="account-settings" element={<Settings />} />
            <Route path="premium" element={<Premium />} />
            <Route path="*" element={<NotFound />} />
            {/* <Route path="/authors" element={<Authors />} /> */}
          </Route>

          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
        </Routes>
      </div>
    </ThemeContextProvider>
  );
};

export default App;
