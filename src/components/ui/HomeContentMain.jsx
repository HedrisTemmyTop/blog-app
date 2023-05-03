import React, { useEffect, useState } from "react";
import classes from "../../styles/Home.module.css";
import { Link, useParams } from "react-router-dom";
// import HomeLinks from "../components/HomeLinks";
const HomeContent = ({ search }) => {
  const [searchVal, setSearchVal] = useState("");
  const searchUrl = window.location.search;
  useEffect(() => {
    if (searchUrl.split("")[0] === "?") {
      const endIndex = searchUrl.split("").length;
      const searched = searchUrl.split("").slice(1, endIndex).join("");
      setSearchVal(searched);
      search(searched);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    window.location = "/search?" + searchVal;
  };
  return (
    <div className={classes.Home}>
      <div>
        <div className={classes.Categories}>
          <div className={classes.Category}>Categories</div>
          <div className={classes.Buttons}>
            <Link to="iconic" className={classes.Link}>
              Ionic
            </Link>
            <Link to="iconic" className={classes.Link}>
              Intermediate
            </Link>
            <Link to="iconic" className={classes.Link}>
              Beginner
            </Link>
            <Link to="iconic" className={classes.Link}>
              Angular
            </Link>
            <Link to="iconic" className={classes.Link}>
              Phraser
            </Link>
            <Link to="iconic" className={classes.Link}>
              Stencil
            </Link>
            <Link to="iconic" className={classes.Link}>
              User Interface
            </Link>
            <Link to="iconic" className={classes.Link}>
              Video
            </Link>
            <Link to="iconic" className={classes.Link}>
              Balance
            </Link>
            <Link to="iconic" className={classes.Link}>
              Balance
            </Link>
            <Link to="iconic" className={classes.Link}>
              Games
            </Link>
            <Link to="iconic" className={classes.Link}>
              Advanced
            </Link>
          </div>
        </div>
        <div className={classes.Feature}>Feature</div>
        <div className={classes.HomeContent}>
          Create Tinder Style Swipe Card With Ionic Gestures
        </div>
      </div>
      <div className={classes.HomeDivs}>
        <div className={classes.HomeDiv}></div>
        <div className={classes.HomeCircle}></div>
        <div className={classes.HomeCircle}></div>
      </div>

      <form className={classes.Form} onSubmit={handleSearch}>
        <input
          type="search"
          className={classes.Input}
          placeholder="Search by tag or title"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
      </form>
    </div>
  );
};

export default HomeContent;
