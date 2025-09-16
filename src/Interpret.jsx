import { useParams, Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from './App';
import './Interpret.css';
import play from '/assets/play.png';
import pause from '/assets/pause.png';
import front from '/assets/front.png';
import back from '/assets/back.png';

function Interpret() {
  const [playListData, setPlayListData] = useState(null);
  const location = useLocation();
  const [interpretData, setInterpretData] = useState(location.state?.interpret);
  const [favorite, setFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode, changeFavorites, favoriteInterprets } = useContext(ThemeContext);
  const [actualSong, setActualSong] = useState();
  const [controlPanelClassName, setControlPanelClassName] = useState("");

  useEffect(() => {
    if (interpretData && favoriteInterprets) {
      const isFav = favoriteInterprets.some(item => item.name === interpretData.name);
      setFavorite(isFav);
    }
  }, [interpretData, favoriteInterprets]);

  useEffect(() => { 
    const loadData = async (name) => {
      try {
        setIsLoading(true);
        const playListModule = await import(`./data/musicData/${name}.json`);
        setPlayListData(playListModule.default);
      } catch(error) {
        console.log(`Failed to load data from: ./data/musicData/${name}.json`, error);
      } finally {
        setIsLoading(false);
      }
    };

    if (interpretData?.name) {
      let camelName = interpretData.name.split(" ");
      if (camelName.length >= 2) {
        camelName[0] = camelName[0].charAt(0).toLowerCase() + camelName[0].slice(1);
        camelName[1] = camelName[1].charAt(0).toUpperCase() + camelName[1].slice(1);
      }
      camelName = camelName.join("");
      loadData(camelName);
    }
  }, [interpretData?.name]);

  if (!interpretData) {
    return (
      <div>
        <h1>Interpret not found</h1>
        <p>No interpret data available</p>
        <Link to="/">← Back to all interprets</Link>
      </div>
    );
  }

  const changeFavorite = () => {
    const newFavoriteState = !favorite;
    setFavorite(newFavoriteState);
    changeFavorites(newFavoriteState, interpretData);
  }

  const interpretImage = interpretData.name.split(" ").join("_").toLowerCase() + ".jfif";
  const interpretImagePath = "https://mathias5467.github.io/listenio/assets/interprets/" + interpretImage;
  const albumCoverPath = "https://mathias5467.github.io/listenio/assets/covers/";

  return (
    <div className="interpret">
      <div className={`interpret-detail ${isDarkMode ? "dark" : ""}`.trim()}>
        <img className="interpret-detail-photo" src={interpretImagePath} alt={interpretData.name}/>
        <h1>{interpretData.name}</h1>
        <h2 className="interpret-detail-favorite" onClick={changeFavorite}>
          {favorite ? "🧡" : "🤍"}
        </h2>
      </div>
      <div className="playlist">
        {(!isLoading) ? (
          (playListData) ? (playListData.map((song, index) => {
            return(
              <div onClick={() => {setActualSong(song); setControlPanelClassName("show")}} key={song.song + index} className={`playlist-item ${isDarkMode ? "dark" : ""}`.trim()}>
                <h2 className="playlist-item-order-number">{`${index + 1}.`}</h2>
                <img className="playlist-item-img" alt="songPhoto" src={albumCoverPath + song.album.toLowerCase() + ".png"} />
                <h2 className="playlist-item-title">{song.song}</h2>
              </div>
            );
          })) : (<h2>No songs</h2>)
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      {(actualSong !== undefined) ? (
        <div className={("control-panel " + controlPanelClassName).trim()}>
          <img className="control-panel-img" alt="actual song" src={albumCoverPath + actualSong.album.toLowerCase() + ".png"}></img>
          
          <div className="control-panel-description">
            <p>{actualSong.song}</p>
            <p>{interpretData.name}</p>
          </div>
          <div className="control-icons-div">
            <div>
              <img className="control-icon" src={back} ></img>
            </div>
            <div>
              <img className="control-icon" src={play} ></img>
            </div>
            <div>
              <img className="control-icon" src={front} ></img>
            </div>
          </div>
            
        </div>
      ) : ("")}
      
    </div>
  );
}

export default Interpret;