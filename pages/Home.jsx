import BlurText from "../animations/BlurText";
import { useState, memo } from "react";

const SearchBar = memo(function SearchBar() {
    const [searchValue, setSearchValue] = useState("");
    const [error, setError] = useState(false);
    
    const handleSearchAndNavigate = () => {
        console.log("Searching for:", searchValue);
        // Reset any previous error state
        setError(false);
        
        // Check if search value is empty
        if (!searchValue.trim()) {
            setError(true);
            return; // Prevent navigation if search is empty
        }
        
        // First handle the search
        
        // Then navigate to the main page
        window.location.href = "/main";
    };
    
    return (
        <div className="search-container">
            <input
                required
                type="text"
                className={`search-bar ${error ? 'error' : ''}`}
                placeholder="Enter your city or location..."
                value={searchValue}
                onChange={(e) => {
                    setSearchValue(e.target.value);
                    if (error) setError(false);
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchAndNavigate()}
            />
            <button className="search-button" onClick={handleSearchAndNavigate}>
                <img src="../images/search.png" alt="Search" />
            </button>
            {error && <div className="error-message">Please enter a location before searching</div>}
        </div>
    );
});

const Header = memo(function Header({ onAnimationComplete }) {
    return (
        <>
            <div className="main-title-container">
                <div className="main-title">
                    <BlurText
                        text="LOCAL EVENT EXPLORER"
                        delay={150}
                        animateBy="words"
                        direction="top"
                        onAnimationComplete={onAnimationComplete}
                        className="text-2xl"
                    />
                </div>
            </div>
            <p className="tagline">Discover events happening around you</p>
        </>
    );
});

const Contact = memo(function Contact() {
    return(
        <div className="contact-section">
            <button className="contact-btn">HOME</button>
            <button className="contact-btn">ABOUT</button>
            <button className="contact-btn">CONTACT</button>
        </div>
    )
});

export default function Home() {
    const handleAnimationComplete = () => {
        console.log("Animation completed!");
    };

    return (
        <div className="home-background">
            <div className="header">
                <Header onAnimationComplete={handleAnimationComplete} />
                <SearchBar />
                <h2 className="discover-text">Discover amazing events happening in your area</h2>
                <Contact />
            </div>
        </div>
    );
}