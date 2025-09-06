import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import data from './data/composers.json';
import './Interpret.css';

function Interpret() {
  const { name: slug } = useParams(); // Getting the URL slug
  console.log("Interpret component rendered with slug:", slug);
  
  // Function to create URL-friendly slug from name (same as in Interprets)
  const createSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };
  
  // Find the interpret by matching the slug with the name
  const interpret = data.find(item => createSlug(item.name) === slug);
  
  if (!interpret) {
    return (
      <div>
        <h1>Interpret not found</h1>
        <p>Could not find interpret with slug: {slug}</p>
        <Link to="/">← Back to all interprets</Link>
      </div>
    );
  }

  const pathToImage = "https://mathias5467.github.io/listenio/assets/interprets/";
  const fileName = interpret.name.split(" ").join("_").toLowerCase();

  return (
    <div className="interpret">
        <div className="interpret-detail">
            <img src={pathToImage + fileName + ".jfif"} alt={interpret.name}/>
            <h1>{interpret.name}</h1>
        </div>
        <div className="playlist">

        </div>
        <div className="control-panel">

        </div>
    </div>
  );
}

export default Interpret;