// src/components/WeatherApp.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import NavBar from './Components/NavBar';
import Aside from './Components/Aside';
import './styles.css'
import logo from "./images/weathercheck-logo-final.png"

const WeatherApp = () => {
  const [zipCode, setZipCode] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getWeatherDataByCoords(latitude, longitude);
      }, (error) => {
        console.error('Error getting geolocation', error)
      })
    } else {
      console.error('Geolocation is not supported by this browser')
    }
  }

  useEffect(() => {
    //getLocation();
  }, [])

  const handleZipCodeChange = (e) => {
    setZipCode(e.target.value);
  };

  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=fd953eddf6f83f966d9240b60bd6fb26&units=imperial`
      );
      setWeatherData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  //Function to get weather data using latitude and longitude
  const getWeatherDataByCoords = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=fd953eddf6f83f966d9240b60bd6fb26&units=imperial`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data', error)
    }
  }

  //Function to handle geolocation button click
  const handleGeolocationClick = () => {
    getLocation();
  }

  return (
    <div className="appContainer">
      <div className="navbarContainer">
        <img className="navbarItem" src={logo} alt="weathercheck logo" />
        
        <input
          className="navbarItem"
          type="text"
          placeholder="Enter ZIP Code"
          value={zipCode}
          onChange={handleZipCodeChange}
        />
        <button className="navbarItem" onClick={getWeatherData}>Get Weather</button>

        <button className="navbarItem" onClick={handleGeolocationClick}>Use Current Location</button>

      <NavBar />
      </div>

      <Aside zipCode={zipCode} weatherData={weatherData} />

      <div className="mainContainer">
        {weatherData && <WeatherCard weatherData={weatherData} />}
      </div>
    </div>
  );
};

export default WeatherApp;
