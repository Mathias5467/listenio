import data from './data/composers.json';
import './Interprets.css';
import play from '/assets/playCard.png';
import { useState } from 'react';
import { Link } from "react-router-dom";
import favoriteIcon from '/assets/heart.png';

function Interprets() {
  const dataArray = data;
  const pathToImage = "https://mathias5467.github.io/listenio/assets/interprets/";
  const [numberOfLoaded, setNumberLoaded] = useState(10);

  const nacitajDalsie = () => {
    setNumberLoaded((prev) => prev + 10);
  };

  // Function to create URL-friendly slug from name
  const createSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-') // Replace non-alphanumeric with dashes
      .replace(/-+/g, '-') // Replace multiple dashes with single dash
      .replace(/^-|-$/g, ''); // Remove leading/trailing dashes
  };

  if (!dataArray || dataArray.length === 0) {
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
        {dataArray.slice(0, numberOfLoaded).map((interpret, index) => {
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
      <div onClick={nacitajDalsie} className="load-button">
        Načítať ďalšie
      </div>
    </div>
  );
}

export default Interprets;