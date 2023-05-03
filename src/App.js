import { Route, Routes } from "react-router-dom";

import { SignUp, SignIn, Layout, Blogs, CreateBlog, Home } from "./pages";

import { ThemeContextProvider } from "./context/context";
import Profile from "./pages/Profile";
import Settings from "./pages/settings";
import Premium from "./pages/premium";
// import Authors from "./pages/Authors";

const App = () => {
  return (
    <ThemeContextProvider>
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="post-blog" element={<CreateBlog />} />
            <Route path="blogs/:id" element={<Blogs />} />
            <Route path="search" element={<Home />} />
            <Route path="edit-blog/:id" element={<CreateBlog />} />
            <Route path="account-settings" element={<Settings />} />
            <Route path="premium" element={<Premium />} />
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
