import { Route, Routes } from "react-router-dom";

import SignUp from "./pages/signup";
import Layout from "./components/ui/Layout";
import SignIn from "./pages/signin";

import Home from "./pages/home";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
