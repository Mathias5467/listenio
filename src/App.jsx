import Nav from "./Nav";
import Interprets from "./Interprets";
import Interpret from "./Interpret";
import { Routes, Route, HashRouter } from 'react-router-dom';
import Favorite from "./Favorite";
import { useState, createContext, useEffect } from 'react';
import darkMode from '/assets/darkMode.png';
import lightMode from '/assets/lightMode.png';

export const ThemeContext = createContext();

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [favoriteInterprets, setFavoriteInterprets] = useState([]);
  const [themeButton, setThemeButton] = useState(lightMode);

  
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteInterprets');
    if (savedFavorites) {
      setFavoriteInterprets(JSON.parse(savedFavorites));
    }
  }, []);

  const changeTheme = () => {
    setIsDarkMode((prev) => !prev);
    setThemeButton(isDarkMode ? darkMode : lightMode);
  };

  const changeFavorites = (addInterpret, interpret) => {
    if (interpret !== undefined) {
      setFavoriteInterprets(prev => {
        let newFavorites;
        if (addInterpret) {
          const exists = prev.some(item => item.name === interpret.name);
          if (exists) return prev;
          newFavorites = [...prev, interpret];
        } else {
          newFavorites = prev.filter(item => item.name !== interpret.name);
        }
        
        
        localStorage.setItem('favoriteInterprets', JSON.stringify(newFavorites));
        return newFavorites;
      });
    }
  }

  

  return (
    <ThemeContext.Provider value={{ isDarkMode, changeFavorites, favoriteInterprets }}>
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
