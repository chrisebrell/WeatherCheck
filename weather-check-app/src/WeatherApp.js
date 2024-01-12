// src/components/WeatherApp.js
import React, { useState } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import NavBar from './Components/NavBar';
import Aside from './Components/Aside';
import './styles.css'

const WeatherApp = () => {
  const [zipCode, setZipCode] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleZipCodeChange = (e) => {
    setZipCode(e.target.value);
  };

  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=fd953eddf6f83f966d9240b60bd6fb26&units=imperial`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="appContainer">
      <div className="navbarContainer">
        <h1 className="navbarItem">WeatherCheck</h1>
        
        <input
          className="navbarItem"
          type="text"
          placeholder="Enter ZIP Code"
          value={zipCode}
          onChange={handleZipCodeChange}
        />
        <button className="navbarItem" onClick={getWeatherData}>Get Weather</button>

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
