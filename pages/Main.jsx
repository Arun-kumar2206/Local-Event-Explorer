import { useState, memo, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSearchParams, useNavigate } from "react-router-dom"; 
import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerRetina from "leaflet/dist/images/marker-icon-2x.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerRetina,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const NavBar = memo(function navBar({ onSearch }) {
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const handleNavigation = (e) => {
        e.preventDefault();
        navigate("/");
    };

    const handleSearch = () => {
        if (searchValue.trim()) {
            onSearch(searchValue);
        }
    };

    return (
        <div className="nav-bar">
            <div className="nav-bar-title">
                <h2><a href="#" onClick={handleNavigation}>LOCAL EVENT EXPLORER</a></h2>
            </div>
            <div className="nav-bar-search">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Change Location"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />
                <button 
                    className="search-button main-search-btn" 
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
        </div>
    );
});

function MapUpdater({ position }) {
    const map = useMap();
    map.setView(position, 13);
    return null;
}

export default function Main() {
    const [searchParams] = useSearchParams(); 
    const [position, setPosition] = useState([51.505, -0.09]);
    const [cityInfo, setCityInfo] = useState("");
    const [cityImage, setCityImage] = useState("");
    const [events, setEvents] = useState([]);
    const eventsContainerRef = useRef(null);

    useEffect(() => {
        const location = searchParams.get("location"); 
        if (location) {
            handleSearch(location); 
        }
    }, [searchParams]);

    const handleSearch = async (location) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
            );
            const data = await response.json();
            if (data.length > 0) {
                const { lat, lon, display_name } = data[0];
                setPosition([parseFloat(lat), parseFloat(lon)]);
                fetchCityInfo(display_name.split(",")[0]); 
                fetchEvents(lat, lon); 
            } else {
                alert("Location not found!");
            }
        } catch (error) {
            console.error("Error fetching location:", error);
            alert("Failed to fetch location. Please try again.");
        }
    };

    const fetchCityInfo = async (city) => {
        try {
            const response = await fetch(
                `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(city)}`
            );
            const data = await response.json();
            if (data.extract) {
                setCityInfo(data.extract);
                setCityImage(data.thumbnail?.source || "");
            } else {
                setCityInfo("No information available for this location.");
                setCityImage("");
            }
        } catch (error) {
            console.error("Error fetching city info:", error);
            setCityInfo("Failed to fetch city information. Please try again.");
            setCityImage("");
        }
    };

    const fetchEvents = async (lat, lon) => {
        try {
            const apiKey = import.meta.env.VITE_REACT_APP_TICKETMASTER_API_KEY;
            const response = await fetch(
                `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&latlong=${lat},${lon}&radius=100&unit=km`
            );
            const data = await response.json();

            if (data._embedded && data._embedded.events) {
                const validEvents = data._embedded.events.filter(event => event.url && event.url.trim() !== "");
                setEvents(validEvents);

                if (eventsContainerRef.current) {
                    eventsContainerRef.current.scrollIntoView({ behavior: "smooth" });
                }
            } else {
                setEvents([]);
            }
        } catch (error) {
            console.error("Error fetching events:", error);
            setEvents([]);
        }
    };

    return (
        <div className="main-background">
            <NavBar onSearch={handleSearch} />
            <div className="content-container">
                <div className="map-container">
                    <MapContainer
                        center={position}
                        zoom={13}
                        style={{ height: "100%", width: "100%", minHeight: "300px" }} // Add minHeight for mobile
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <MapUpdater position={position} />
                        <Marker position={position}>
                            <Popup>
                                Selected Location: {position[0].toFixed(4)}, {position[1].toFixed(4)}
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
                <div className="city-info">
                    <h3>City Information</h3>
                    {cityImage && <img src={cityImage} alt="City" className="city-image" />}
                    <p>{cityInfo}</p>
                </div>
            </div>
            <div className="events-container" ref={eventsContainerRef}>
                <h3>Upcoming Events</h3>
                {events.length > 0 ? (
                    <ul className="events-list">
                        {events.map((event) => (
                            <li key={event.id} className="event-item">
                                <a href={event.url} target="_blank" rel="noopener noreferrer">
                                    {event.images && event.images.length > 0 && (
                                        <img
                                            src={event.images[0].url}
                                            alt={event.name}
                                            className="event-image"
                                        />
                                    )}
                                    {event.name}
                                </a>
                                <p>{new Date(event.dates.start.dateTime).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No events found for this location. Try searching for a different location.</p>
                )}
            </div>
        </div>
    );
}