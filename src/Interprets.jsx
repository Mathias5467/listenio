import data from './data/composers.json';
import './Interprets.css';
import play from '/assets/playCard.png';
import { useState } from 'react';

function Interprets() {
  const dataArray = data;
  const pathToImage = "https://mathias5467.github.io/listenio/assets/interprets/";
  const [numberOfLoaded, setNumberLoaded] = useState(10);


  const nacitajDalsie = () => {
    setNumberLoaded((prev) => prev + 10);
  }

  return (
    <div className="interprets">
      <div className="content">
      {dataArray.slice(0, numberOfLoaded).map((interpret, index) => {
        const fileName = interpret.name.split(" ").join("_").toLowerCase();
        return (
          <div id={fileName} className="card" key={`${interpret.name}-${index}`}>
            <img
              className="card-image"
              src={pathToImage + fileName + ".jfif"}
              alt={interpret.name}
            />
            <h2 className="card-title">{interpret.name}</h2>
            <div className="card-button">
              <img className="card-button-img" src={play} alt="play button" />
            </div>
          </div>
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
