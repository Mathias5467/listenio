import data from './data/composers.json';
import './Interprets.css';
import play from '/assets/playCard.png';
import { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import favoriteIcon from '/assets/heart.png';

function Interprets() {
  const pathToImage = "https://mathias5467.github.io/listenio/assets/interprets/";
  const [numberOfLoaded, setNumberLoaded] = useState(10);
  const [usedData, setUsedData] = useState(data);
  const location = useLocation();
  const searchedInterprets = location.state?.searchedInterprets; // Fixed property name
  

  // Use useEffect to update usedData when searchedInterprets changes
  useEffect(() => {
    if (searchedInterprets && searchedInterprets.length > 0) {
      setUsedData(searchedInterprets);
      setNumberLoaded(searchedInterprets.length); // Show all search results
    } else {
      setUsedData(data); // Reset to original data
      setNumberLoaded(10); // Reset to initial load count
    }
  }, [searchedInterprets]);

  const loadMore = () => {
    setNumberLoaded((prev) => prev + 10);
  };

  // Function to create URL-friendly slug from name
  const createSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  if (!usedData || usedData.length === 0) {
    return <div>No data found</div>;
  }

  return (
    <div className="interprets">
      <div className="content">
        <Link to="/interpret/favorite" className="card">
          <div className="favorite-div">
            <img className="card-image favorite" src={favoriteIcon} alt="heart"/>
          </div>
          <h2 className="card-title">Favorite</h2>
          <div className="card-button">
            <img className="card-button-img" src={play} alt="play button" />
          </div>
        </Link>
        
        {usedData.slice(0, numberOfLoaded).map((interpret, index) => {
          const fileName = interpret.name.split(" ").join("_").toLowerCase();
          const slug = createSlug(interpret.name);
                   
          return (
            <Link
              to={`/interpret/${slug}`}
              key={`${interpret.name}-${index}`}
              className="card"
              id={fileName}
            >
              <img
                className="card-image"
                src={pathToImage + fileName + ".jfif"}
                alt={interpret.name}
              />
              <h2 className="card-title">{interpret.name}</h2>
              <div className="card-button">
                <img className="card-button-img" src={play} alt="play button" />
              </div>
            </Link>
          );
        })}
      </div>
      
      {/* Only show load more button if we're showing original data and there's more to load */}
      {!searchedInterprets && usedData.length > numberOfLoaded && (
        <div onClick={loadMore} className="load-button">
          Načítať ďalšie
        </div>
      )}
    </div>
  );
}

export default Interprets;