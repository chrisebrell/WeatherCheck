// src/components/WeatherApp.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import NavBar from './Components/NavBar';
import './styles.css'
import logo from "./images/weathercheck-logo-final.png"

const WeatherApp = () => {
  const [zipCode, setZipCode] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getWeatherDataByCoords(latitude, longitude);
      }, (error) => {
        console.error('Error getting geolocation', error)
        setError('Error getting geolocation. Please Try Again')
      })
    } else {
      console.error('Geolocation is not supported by this browser')
      setError('Geolocation is not supported by this browser')
    }
  }

  useEffect(() => {
    //getLocation();
  }, [])

  const handleZipCodeChange = (e) => {
    setZipCode(e.target.value);
  };

  const getWeatherData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=fd953eddf6f83f966d9240b60bd6fb26&units=imperial`
      );
      setWeatherData(response.data);
      console.log(response.data)

      //Save Zip code to mongoDb
      saveZipCodeToMongoDb();

    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Error fetching weather data. Please try again')
    } finally {
      setLoading(false);
    }
  };

  const saveZipCodeToMongoDb = async () => {
    try {
      await axios.post('http://localhost:5000/api/save-zipcode', { zip: zipCode });
      console.log('Zip code saved to MongoDB');
    } catch (error) {
      console.log('Error saving ZIP code to MongoDB', error);
      setError('Error saving ZIP code to. Please try again')
    }
  }

  //Function to get weather data using latitude and longitude
  const getWeatherDataByCoords = async (latitude, longitude) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=fd953eddf6f83f966d9240b60bd6fb26&units=imperial`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data', error)
      setError('Error fetching weather data. Please try again')
    } finally {
      setLoading(false);
    }
  }

  //Function to handle geolocation button click
  const handleGeolocationClick = () => {
    getLocation();
  }

  return (
    <div className="appContainer">
      <div className="navbarContainer">
        {/* <img className="navbarItem" src={logo} alt="weathercheck logo" /> */}
        <a href="/">
    <img className="navbarItem" src={logo} alt="weathercheck logo" />
  </a>
        <input
          className="navbarItem"
          type="text"
          placeholder="Enter ZIP Code"
          value={zipCode}
          onChange={handleZipCodeChange}
        />
        <button className="navbarItem" onClick={getWeatherData} disabled={loading}>
          {loading ? 'Fetching...' : 'Get Weather'}
        </button>

        <button className="navbarItem" onClick={handleGeolocationClick} disabled={loading}>
          Use Current Location
        </button>

      <NavBar />
      </div>

      <div className="mainContainer">
        {error && <p className="error-message">{error}</p>}
        {loading && <p>Loading...</p>}
        {weatherData && <WeatherCard weatherData={weatherData} />}
      </div>
    </div>
  );
};

export default WeatherApp;
