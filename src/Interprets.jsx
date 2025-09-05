import data from './data/composers.json';
import './Interprets.css';
import play from '/assets/playCard.png';

function Interprets() {
  const dataArray = data;
  const pathToImage = process.env.PUBLIC_URL + "/assets/interprets/";


  return (
    <div className="content">
      {dataArray.map((interpret, index) => {
        const fileName = interpret.name.split(" ").join("_").toLowerCase(); // adjust extension
        return (
          <div id={fileName} className="card" key={`${interpret.name}-${index}`}>
            <img className="card-image" src={pathToImage + fileName + ".jfif"} alt={interpret.name} />
            <h2 className="card-title">{interpret.name}</h2>
            <div className="card-button">
                <img className="card-button-img" src={play}></img>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Interprets;
