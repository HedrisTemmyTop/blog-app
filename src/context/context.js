import React, { useState } from "react";
export const ThemeContext = React.createContext();

export const ThemeContextProvider = (props) => {
  const dark = localStorage.getItem("dark");
  const [darkTheme, setIsDarkTheme] = useState(dark ? JSON.parse(dark) : true);
  const toggleThemeContext = () => {
    setIsDarkTheme((prev) => !prev);
    localStorage.setItem("dark", !darkTheme);
  };

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleThemeContext }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
