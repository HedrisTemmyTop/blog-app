import React, { useContext } from "react";
import { ThemeContext } from "../context/context";
import { Link } from "react-router-dom";

function NotFound() {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <div
      style={
        darkTheme
          ? {
              display: "grid",
              placeItems: "center",
              margin: "8rem",
              color: "#fff",
            }
          : {
              display: "grid",
              placeItems: "center",
              margin: "8rem",
              color: "inherit",
            }
      }
    >
      <div>
        <h1>404 Page Not Found</h1>
        <p style={{ display: "inline" }}>
          We're sorry, but the page you requested does not exist.
        </p>
        <Link to="/" style={{ color: "blue" }}>
          go back to home page
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
