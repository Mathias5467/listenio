import Nav from "./Nav";
import Interprets from "./Interprets";
import Interpret from "./Interpret";
import { Routes, Route, BrowserRouter, HashRouter } from 'react-router-dom';
import Favorite from "./Favorite";
import { useState, createContext } from 'react';
import darkMode from '/assets/darkMode.png';
import lightMode from '/assets/lightMode.png';

export const ThemeContext = createContext();
export const FavoriteContext = createContext();

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [themeButton, setThemeButton] = useState(lightMode);
  const [favoriteInterprets, setFavoriteInterprets] = useState([]);

  const changeTheme = () => {
    setIsDarkMode((prev) => !prev);
    setThemeButton(isDarkMode ? darkMode : lightMode);
  };

  const configureFavorite = (addInterpret, interpret) => {
    setFavoriteInterprets((prev) => {
      if (addInterpret) {
        if (prev.includes(interpret)) return prev;
        setFavoriteInterprets([...prev, interpret]);
      } else {
        setFavoriteInterprets(prev.filter((item) => item !== interpret));
      }
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, changeTheme }}>
      <FavoriteContext.Provider value={{ favoriteInterprets, configureFavorite }}>
        <HashRouter>
          <div className={`container ${isDarkMode ? "dark" : ""}`.trim()}>
            <Nav />
            <img
              onClick={changeTheme}
              className="theme-button"
              alt="theme"
              src={themeButton}
            />
            <Routes>
              <Route path="/" element={<Interprets />} />
              <Route path="/interpret/:name" element={<Interpret />} />
              <Route path="/interpret/favorite" element={<Favorite />} />
            </Routes>
          </div>
        </HashRouter>
      </FavoriteContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
