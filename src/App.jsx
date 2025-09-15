import Nav from "./Nav";
import Interprets from "./Interprets";
import Interpret from "./Interpret";
import { Routes, Route, HashRouter } from 'react-router-dom';
import Favorite from "./Favorite";
import { useState, createContext } from 'react';
import darkMode from '/assets/darkMode.png';
import lightMode from '/assets/lightMode.png';

export const ThemeContext = createContext();

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [favoriteInterprets, setFavoriteInterprets] = useState([]);
  const [themeButton, setThemeButton] = useState(lightMode);

  const changeTheme = () => {
    setIsDarkMode((prev) => !prev);
    setThemeButton(isDarkMode ? darkMode : lightMode);
  };

  const changeFavorites = (addInterpret, interpret) => {
    if (interpret !== undefined) {
      if (addInterpret) {
        if (!favoriteInterprets.includes(interpret)) {
          setFavoriteInterprets(prev => [...prev, interpret])
        }
      }
      let tempInterprets = [...favoriteInterprets];
      tempInterprets.filter(item => item !== interpret);
      setFavoriteInterprets(tempInterprets);
    }
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode }}>
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
    </ThemeContext.Provider>
  );
};

export default App;
