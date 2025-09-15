import { ThemeContext } from "./App";
import { useContext } from "react";
import './Interprets.css';
import play from '/assets/playCard.png';



export default function InterpretCard({interpret}) {
    const { isDarkMode } = useContext(ThemeContext);
    const pathToImage = "https://mathias5467.github.io/listenio/assets/interprets/";
    const fileName = interpret.name.split(" ").join("_").toLowerCase();
    return(
        <>
            <img
                className="card-image"
                src={pathToImage + fileName + ".jfif"}
                alt={interpret.name}
              />
              <h2 className={`card-title ${isDarkMode ? "dark" : ""}`.trim()}>{interpret.name}</h2>
              <div className="card-button">
                <img className="card-button-img" src={play} alt="play button" />
              </div>
        </>
    );
}