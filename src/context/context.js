import React, { useState } from "react";
export const ThemeContext = React.createContext();

export const ThemeContextProvider = (props) => {
  const [darkTheme, setIsDarkTheme] = useState(true);
  const toggleThemeContext = () => {
    setIsDarkTheme(!darkTheme);
  };

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleThemeContext }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
