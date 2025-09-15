import { useContext } from "react";
import { Link } from 'react-router-dom';
import { ThemeContext } from "./App";
import InterpretCard from "./InterpretCard";


function Favorite() {
    const { isDarkMode, favoriteInterprets } = useContext(ThemeContext);

    const createSlug = (name) => {
        return name.toLowerCase().replace(" ", "-");
    };

    return(
        <div className="content">
            {favoriteInterprets.map((interpret, index) => {
                const fileName = interpret.name.split(" ").join("_").toLowerCase();
                const slug = createSlug(interpret.name);
                return(
                    <Link
                    to={`/interpret/${slug}`}
                    key={`${interpret.name}-${index}`}
                    state={{interpret}}
                    className={`card ${isDarkMode ? "dark" : ""}`.trim()}
                    id={fileName}
                    
                    >
                        <InterpretCard interpret={interpret}></InterpretCard>
                    </Link>
                );
            })}
        </div>
    );
}

export default Favorite;