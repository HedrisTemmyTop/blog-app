import { Route, Routes } from "react-router-dom";

import SignUp from "./pages/signup";
import Layout from "./components/ui/Layout";
import SignIn from "./pages/signin";
import Blogs from "./pages/Blogs";
import CreateBlog from "./pages/createPost";
import Home from "./pages/home";

import { ThemeContextProvider } from "./context/context";
import Profile from "./pages/Profile";

function App() {
  return (
    <ThemeContextProvider>
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="post-blog" element={<CreateBlog />} />
            <Route path="blogs/:id" element={<Blogs />} />
            <Route path="edit-blog/:id" element={<CreateBlog />} />
          </Route>

          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
        </Routes>
      </div>
    </ThemeContextProvider>
  );
}

export default App;
