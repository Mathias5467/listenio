import './Nav.css';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logoIcon from "/assets/logo.svg";
import searchIcon from "/assets/search.png";
import interpretsData from './data/composers.json';
import notFoundImage from '/assets/notFound.png';

function Nav() {
    const [burgerClass, setBurger] = useState("burger-menu");
    const [hiddenNav, setHiddenNav] = useState("nav-hidden");
    const [searchedTerm, setSearchedTerm] = useState("");
    const [searchTranslate, setSearchTranslate] = useState("search-div");
    const [searchedInterprets, setSearchedInterprets] = useState([]);
    const [inputFocused, setInputFocused] = useState(false);
    const shouldCloseRef = useRef(true);
    const navigate = useNavigate();
    const pathToImage = "https://mathias5467.github.io/listenio/assets/interprets/";
    const inputRef = useRef(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
    
    useEffect(() => {
        let previousWidth = window.innerWidth;

        const handleResize = () => {
            const currentWidth = window.innerWidth;
            if ((previousWidth <= 655 && currentWidth > 655) || (previousWidth > 655 && currentWidth <= 655)) {
                if (inputRef.current) {
                    inputRef.current.blur();
                }
            }
            previousWidth = currentWidth;
            setWindowWidth(currentWidth);
        }
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
        const value = e.target.value;
        setSearchedTerm(value);

        if (value !== "") {
            const count = 5;
            setSearchedInterprets(
                interpretsData
                    .filter(interpret => (interpret.name).toLowerCase().startsWith(value.toLowerCase()))
                    .slice(0, count)
            );
        } else {
            setSearchedInterprets([]);
        }
    };

    const checkEnter = (e) => {
        if (inputFocused && e.key === 'Enter') {
            focusOff();
            navigate("/", {state: {searchedInterprets}})
        }
    }

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
        shouldCloseRef.current = false;
        if (!burgerClass.includes("active-menu")) {
            setTimeout(() => {
                setHiddenNav("nav-hidden show");
                setSearchTranslate("search-div translate-div");
                setInputFocused(true);
            }, 500);
        }
    }

    const focusOff = () => {
        shouldCloseRef.current = true;
        setTimeout(() => {
            if (shouldCloseRef.current) {
                setHiddenNav("nav-hidden");
                setSearchTranslate("search-div");
                setBurger("burger-menu");
                setInputFocused(false);
            }
        }, 200);
    }

    const handleSearchResultMouseDown = (e) => {
        shouldCloseRef.current = false;
    }

    const handleSearchResultMouseUp = () => {
        shouldCloseRef.current = true;
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
                    <input 
                        value={searchedTerm} 
                        id="search" 
                        onChange={searchingPartially} 
                        onFocus={focusOn} 
                        onBlur={focusOff}
                        onKeyDown={(e) => checkEnter(e)}
                        ref={inputRef}
                        className="search" 
                        type="text" 
                        placeholder='Search...' 
                        autoComplete="off" 
                    />
                    <Link to="/" state={{searchedInterprets}}>
                        <img className="search-icon" alt="search" src={searchIcon}></img>
                    </Link>
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
                    {searchedTerm && searchedInterprets.length === 0 ? (
                        <div className="search-list-item"> 
                            <img src={notFoundImage} alt="not found" />
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
                                onMouseDown={handleSearchResultMouseDown}
                                onMouseUp={handleSearchResultMouseUp}
                            >
                                <div className="search-list-item"> 
                                    <img src={pathToImage + fileName + ".jfif"} alt={interpret.name} />
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