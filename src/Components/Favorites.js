import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import WeatherCard from '../WeatherCard'

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedZip, setSelectedZip] = useState(null);
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/favorite-list');
                setFavorites(response.data);
            } catch (error) {
                console.error('Error fetching favorites:', error);
                setError('Error fetching favorites. Please try again');
            } finally {
                setLoading(false);
            }
        };
        fetchFavorites();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/favorite/${id}`);
            //after successful deletion, update the state to reflect the changes
            setFavorites((prevFavorites) => prevFavorites.filter((favorite) => favorite._id !== id));
            setWeatherData(null);
        } catch (error) {
            console.error('Error deleting favorite', error);
            setError('Error deleting favorite. Please try again')
        }
    };

    const handleZipClick = async (zip) => {
        setSelectedZip(zip);
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=fd953eddf6f83f966d9240b60bd6fb26&units=imperial`);
            setWeatherData(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error)
            setError('Error fetching weather data. Please try again');
        }
    }

  return (
    <div>
      <h2>Favorites</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && favorites.length === 0 && <p>No favorite zip codes found</p>}
      {!loading && favorites.length > 0 && (
        <div>
          <ul>
            {favorites.map((favorite) => (
              <li key={favorite._id}>
                <Link to={`/weather/${favorite.zip}`}>
                  {favorite.zip}
                </Link>
                <button onClick={() => handleZipClick(favorite.zip)}>Get Weather</button>
                <button onClick={() => handleDelete(favorite._id)}>Delete</button>
              </li>
            ))}
          </ul>
          {selectedZip && (
            <div>
              <h3>Weather for {selectedZip}</h3>
              {weatherData ? (
                <WeatherCard weatherData={weatherData} />
              ) : (
                <p>Loading weather data...</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Favorites