import React, { createContext, useContext, useState } from "react";
import useLocalStorage from "use-local-storage";

const DataContext = createContext();

export function useThemeData() {
  return useContext(DataContext);
}

export function ThemeDataProvider({ children }) {
  const [themeData, setThemeData] = useLocalStorage("theme" ? "dark" : "light");

  return (
    <DataContext.Provider value={{ themeData, setThemeData }}>
      {children}
    </DataContext.Provider>
  );
}
