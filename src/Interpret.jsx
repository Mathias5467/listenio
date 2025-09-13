import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { ThemeContext, FavoriteContext } from './App';
import './Interpret.css';
import tempAlbumCover from '/assets/interprets/shawn_mendes.jfif';

function Interpret() {
  const { name: slug } = useParams();
  const [playListData, setPlayListData] = useState(null);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode, changeTheme } = useContext(ThemeContext);

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
    let tempName;
    if (slug) {
      setName(normalName());
      tempName = slug.split("-");
      if (tempName.length >= 2) {
        tempName[1] = tempName[1].charAt(0).toUpperCase() + tempName[1].slice(1);
      }
      tempName = tempName.join("");
    }
    loadData(tempName);
  }, [slug]);

  const normalName = () => {
    let tempName = slug.split("-"); 
    if (tempName.length >= 2) {
      tempName[0] = tempName[0].charAt(0).toUpperCase() + tempName[0].slice(1);
      tempName[1] = tempName[1].charAt(0).toUpperCase() + tempName[1].slice(1);
    }
    return tempName.join(" ");
  }

  

  if (!name) {
    return (
      <div>
        <h1>Interpret not found</h1>
        <p>Could not find interpret: {slug}</p>
        <Link to="/">← Back to all interprets</Link>
      </div>
    );
  }

  const pathToImage = "https://mathias5467.github.io/listenio/assets/interprets/";
  const pathAssets = "https://mathias5467.github.io/listenio/assets";
  const fileName = name.split(" ").join("_").toLowerCase();

  return (
    <div className="interpret">
      <div className={`interpret-detail ${isDarkMode ? "dark" : ""}`.trim()}>
        <img className="interpret-detail-photo" src={pathToImage + fileName + ".jfif"} alt={name}/>
        <h1>{name}</h1>
      </div>
      <div className="playlist">
        {(!isLoading) ? (
          (playListData) ? (playListData.map((song, index) => {
          return(<div key={song+index} className={`playlist-item ${isDarkMode ? "dark" : ""}`.trim()}>
            <h2 className="playlist-item-order-number">{`${index + 1}.`}</h2>
            <img className="playlist-item-img" alt="songPhoto" src={tempAlbumCover}></img>
            <h2 className="playlist-item-title">{song.song}</h2>
          </div>);
        })) : (<h2>No songs</h2>)
        ) : (
          <h1>Loading...</h1>
        )
        }
      </div>
      <div className="control-panel">
        {/* control panel */}
      </div>
    </div>
  );
}

export default Interpret;