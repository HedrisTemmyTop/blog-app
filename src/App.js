import { Route, Routes } from "react-router-dom";

import SignUp from "./pages/signup";
import Layout from "./components/ui/Layout";
import SignIn from "./pages/signin";
import Blogs from "./pages/Blogs";

import Home from "./pages/home";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="blogs/:id" element={<Blogs />} />
        </Route>

        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
