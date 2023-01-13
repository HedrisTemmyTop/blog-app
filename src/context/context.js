import React, { useState } from "react";
import { BsSun, BsMoon } from "react-icons/bs";
export const ThemeContext = React.createContext();

export const ThemeContextProvider = (props) => {
  const [darkTheme, setIsDarkTheme] = useState(true);
  const toggleThemeContext = () => {
    setIsDarkTheme(!darkTheme);
  };

  return (
    <ThemeContext.Provider value={darkTheme}>
      <div className="mode" onClick={toggleThemeContext}>
        {darkTheme ? <BsMoon /> : <BsSun className="sun" />}
      </div>
      {props.children}
    </ThemeContext.Provider>
  );
};
