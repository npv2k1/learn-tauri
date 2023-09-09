import { createContext, PropsWithChildren, useEffect, useState } from "react";

import { ThemeMode } from "@/common/constants";

export interface IAppContext {
  theme: string;
  toggleTheme?: () => void;
}

export const AppContext = createContext<IAppContext>({
  theme: ThemeMode.LIGHT,
  toggleTheme: () => {},
});

const AppContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<string>(ThemeMode.LIGHT);

  const toggleTheme = () => {
    const newTheme =
      theme === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const localTheme: string = localStorage.getItem("theme") ?? ThemeMode.LIGHT;
    if (localTheme) {
      setTheme(localTheme);
    }
  }, []);

  useEffect(() => {
    if (theme === ThemeMode.DARK) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <AppContext.Provider value={{ theme: theme, toggleTheme: toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
