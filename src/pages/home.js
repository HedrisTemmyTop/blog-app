import React from "react";
import PaginationButtons from "../components/ui/paginationButtons";
import Articles from "../components/ui/articles/articles";
import HomeContent from "../components/ui/HomeContentMain";
const Home = () => {
  return (
    <div>
      <HomeContent />
      <Articles />
      <PaginationButtons />
    </div>
  );
};

export default Home;
