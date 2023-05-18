import React, { useState } from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

interface ThemeContextValue {
  darkTheme: boolean;
  toggleThemeContext: () => void;
}

export const ThemeContext = React.createContext<ThemeContextValue>({
  darkTheme: true,
  toggleThemeContext: () => {},
});

export const ThemeContextProvider: React.FC<ThemeProviderProps> = (props) => {
  const dark = localStorage.getItem("dark");
  const [darkTheme, setIsDarkTheme] = useState<boolean>(
    dark ? JSON.parse(dark) : true
  );

  const toggleThemeContext = () => {
    setIsDarkTheme((prev) => !prev);
    localStorage.setItem("dark", JSON.stringify(!darkTheme));
  };

  const themeProviderValue: ThemeContextValue = {
    darkTheme,
    toggleThemeContext,
  };

  return (
    <ThemeContext.Provider value={themeProviderValue}>
      {props.children}
    </ThemeContext.Provider>
  );
};
