import './Nav.css';
import { useState } from 'react';
import home from "./assets/home.png";
import heart from "./assets/heart.png";

function Nav () {
    const [burgerClass, setBurger] = useState("burger-menu");
    const [hiddenNav, setHiddenNav] = useState("nav-hidden");
    const [searchDivHide, setSearchDivHide] = useState("search-div");

    const clickBurger = () => {
        setSearchDivHide((prev) => 
            prev === "search-div" ? "search-div hidden" : "search-div"
        );
        setBurger((prev) =>
        prev === "burger-menu"
            ? "burger-menu active-menu"
            : "burger-menu"
        );
        setHiddenNav((prev) => 
            prev === "nav-hidden" ? "nav-hidden show" : "nav-hidden"
        );
    }
    return(
        <div className="nav-container">
            <div className="nav">
                <div className="nav-logo">
                    <img alt="logo" src="src/assets/logo.svg"></img>
                    <h1>Listenio<small><sup>&copy;</sup></small></h1>
                </div>
                <div className={searchDivHide}>
                    <input className="search" type="text" placeholder='Search...'></input>
                    <img className="search-icon" alt="search" src="src/assets/search.png"></img>
                </div>
                
                <div className={burgerClass} id="burger" onClick={clickBurger}>
                    <div className="stick" id="stick1"></div>
                    <div className="stick" id="stick2"></div>
                    <div className="stick" id="stick3"></div>
                </div>
            </div>
            <div className={hiddenNav}>
                <div className="nav-hidden-div">
                    <input className="search-hidden" type="text" placeholder='Search...'></input>
                    <img className="search-icon" alt="search" src="src/assets/search.png"></img>
                </div>
                <div className="nav-hidden-div">
                    <img className="nav-hidden-img" alt="home" src={home}></img>
                    <h2 className="nav-hidden-text">Home</h2>
                </div>
                <div className="nav-hidden-div">
                    <img className="nav-hidden-img" alt="favorite" src={heart}></img>
                    <h2 className="nav-hidden-text">Favorite</h2>
                </div>
            </div>
        </div>
    );
        
}

export default Nav;