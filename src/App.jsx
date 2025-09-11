import Nav from "./Nav";
import Interprets from "./Interprets";
import Interpret from "./Interpret";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Favorite from "./Favorite";
import { useState, createContext,  } from 'react';
import darkMode from '/assets/darkMode.png';
import lightMode from '/assets/lightMode.png';

export const ThemeContext = createContext();

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [themeButton, setThemeButton] = useState(lightMode);

  const changeTheme = () => {
    setIsDarkMode((prev) => !prev);
    setThemeButton(isDarkMode ? darkMode : lightMode);
  }
  return (
    <ThemeContext.Provider value={{ isDarkMode, changeTheme }}>
      <BrowserRouter basename="/listenio">
      <div className={`container ${isDarkMode && "dark"}`}>
        <Nav />
        <img onClick={changeTheme} className="theme-button" alt="theme" src={themeButton}></img>
        <Routes>
          <Route path="/" element={<Interprets />} />

          <Route path="/interpret/:name" element={<Interpret />} />
          <Route path="/interpret/favorite" element={<Favorite />} />
        </Routes>
      </div>
    </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;