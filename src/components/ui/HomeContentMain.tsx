import React, { useEffect, useState } from "react";
import classes from "../../styles/Home.module.css";
import { Link } from "react-router-dom";
import img from "../../assets/hotstuff.svg";
interface propTypes {
  search: (val: string) => void;
}
const HomeContent = ({ search }: propTypes) => {
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

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")!);
    if (searchHistory) searchHistory.unshift(searchVal);
    else searchHistory = [searchVal];
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    window.location.href = "/search?" + searchVal;
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
          <img
            src={img}
            alt="hot stuff"
            style={{
              height: "2.7rem",
              marginLeft: "1rem",
              width: "10.1rem",
            }}
          />
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
