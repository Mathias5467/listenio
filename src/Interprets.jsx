import data from './data/composers.json';
import './Interprets.css';
import play from '/assets/playCard.png';
import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from './App';
import { Link, useLocation } from "react-router-dom";
import favoriteIcon from '/assets/heart.png';


function Interprets() {
  const pathToImage = "https://mathias5467.github.io/listenio/assets/interprets/";
  const [numberLoaded, setNumberLoaded] = useState(10);
  const [usedData, setUsedData] = useState(data);
  const location = useLocation();
  const searchedInterprets = location.state?.searchedInterprets;
  const { isDarkMode } = useContext(ThemeContext);
  

  useEffect(() => {
    if (searchedInterprets && searchedInterprets.length > 0) {
      setUsedData(searchedInterprets);
      setNumberLoaded(10);
    } else {
      setUsedData(data);
      setNumberLoaded(10);
    }
  }, [searchedInterprets]);


  /*load more interpret cards*/
  const loadMore = () => {
    setNumberLoaded((prev) => prev + 10);
  };
  /*Create url frienly name*/
  const createSlug = (name) => {
    return name.toLowerCase().replace(" ", "-");
  };


  if (!usedData || usedData.length === 0) {
    return <div>No data found</div>;
  }

  
  return (
    <div className="interprets">
      <div className="content">
        <Link to="/interpret/favorite" className={`card ${isDarkMode ? "dark" : ""}`.trim()}>
          <div className="favorite-div">
            <img className="card-image favorite" src={favoriteIcon} alt="heart"/>
          </div>
          <h2 className={`card-title ${isDarkMode ? "dark" : ""}`.trim()}>Favorite</h2>
          <div className="card-button">
            <img className="card-button-img" src={play} alt="play button" />
          </div>
        </Link>
        
        {usedData.slice(0, numberLoaded).map((interpret, index) => {
          const fileName = interpret.name.split(" ").join("_").toLowerCase();
          const slug = createSlug(interpret.name);
          return (
            <Link
              to={`/interpret/${slug}`}
              key={`${interpret.name}-${index}`}
              state={{interpret}}
              className={`card ${isDarkMode ? "dark" : ""}`.trim()}
              id={fileName}
              
            >
              <img
                className="card-image"
                src={pathToImage + fileName + ".jfif"}
                alt={interpret.name}
              />
              <h2 className={`card-title ${isDarkMode ? "dark" : ""}`.trim()}>{interpret.name}</h2>
              <div className="card-button">
                <img className="card-button-img" src={play} alt="play button" />
              </div>
            </Link>
          );
        })}
      </div>
      
      {usedData.length > numberLoaded && (
        <div onClick={loadMore} className={`load-button ${isDarkMode ? "dark" : ""}`.trim()}>
          Načítať ďalšie
        </div>
      )}
    </div>
  );
}

export default Interprets;