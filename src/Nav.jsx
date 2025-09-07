import './Nav.css';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import logoIcon from "/assets/logo.svg";
import searchIcon from "/assets/search.png";
import interpretsData from './data/composers.json';

function Nav() {
    const [burgerClass, setBurger] = useState("burger-menu");
    const [hiddenNav, setHiddenNav] = useState("nav-hidden");
    const [searchedTerm, setSearchedTerm] = useState("");
    const [searchTranslate, setSearchTranslate] = useState("search-div");
    const [searchedInterprets, setSearchedInterprets] = useState([]);
    const pathToImage = "https://mathias5467.github.io/listenio/assets/interprets/";
    
    useEffect(() => {
        const handleResize = () => {
            setBurger("burger-menu");
            setHiddenNav("nav-hidden");
            setSearchTranslate("search-div");
            if (document.activeElement && document.activeElement.blur) {
                document.activeElement.blur();
            }
        };


        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const createSlug = (name) => {
        return name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-') // Replace non-alphanumeric with dashes
        .replace(/-+/g, '-') // Replace multiple dashes with single dash
        .replace(/^-|-$/g, ''); // Remove leading/trailing dashes
    };

    const searchingPartially = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchedTerm(value);

        if (value !== "") {
            const count = 5;
            setSearchedInterprets(
                interpretsData
                    .filter(interpret => (interpret.name).toLowerCase().includes(value))
                    .slice(0, count)
            );
        } else {
            setSearchedInterprets([]);
        }
        
    };


    const clickBurger = () => {
        setBurger((prev) =>
            prev === "burger-menu"
                ? "burger-menu active-menu"
                : "burger-menu"
        );
        setHiddenNav((prev) => 
            prev === "nav-hidden" ? "nav-hidden show" : "nav-hidden"
        );
        setSearchTranslate((prev) =>
            prev === "search-div" ? "search-div translate-search" : "search-div"
        );
    }

    const focusOn = () => {
        if (!burgerClass.includes("active-menu")) {
            setHiddenNav("nav-hidden show");
            setSearchTranslate("search-div translate-div");
        }
    }

    const focusOff = () => {
        setTimeout(() => {
            setHiddenNav("nav-hidden");
            setSearchTranslate("search-div");
            setSearchedTerm("");
            setSearchedInterprets([]);
            setBurger("burger-menu");
        }, 100);
    }

    return(
        <div className="nav-container">
            <div className="nav">
                <Link to="/" className="nav-logo-link">
                    <div className="nav-logo">
                        <img alt="logo" src={logoIcon}></img>
                        <h1>Listenio<small><sup>&copy;</sup></small></h1>
                    </div>
                </Link>
                <div className={searchTranslate}>
                    <input value={searchedTerm} id="search" onChange={(e) => searchingPartially(e)} onFocus={focusOn} onBlur={focusOff} className="search" type="text" placeholder='Search...' autoComplete="off" ></input>
                    <img className="search-icon" alt="search" src={searchIcon}></img>
                </div>
                
                <div className={burgerClass} id="burger" onClick={clickBurger}>
                    <div className="stick" id="stick1"></div>
                    <div className="stick" id="stick2"></div>
                    <div className="stick" id="stick3"></div>
                </div>
            </div>
            <div className={hiddenNav}>
                <div className="nav-hidden-search">

                </div>
                <div className="search-list">
                    {searchedInterprets.length === 0 ? (
                        <div className="search-list-item centered"> 
                            <p>No results...</p>
                        </div>
                    ) : (
                        searchedInterprets.map((interpret, index) => {
                        const slug = createSlug(interpret.name);
                        const fileName = interpret.name.split(" ").join("_").toLowerCase();
                        return (
                            <Link
                            className="search-link"
                            to={`/interpret/${slug}`}  
                            key={interpret.name + index}
                            >
                                <div className="search-list-item"> 
                                    <img src={pathToImage + fileName + ".jfif"}></img>
                                    <p>{interpret.name}</p>
                                </div>
                            </Link>
                        );
                        })
                    )}
                </div>

            </div>
        </div>
    );
}

export default Nav;