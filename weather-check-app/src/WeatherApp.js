// src/components/WeatherApp.js
import React, { useState } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';

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
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter ZIP Code"
        value={zipCode}
        onChange={handleZipCodeChange}
      />
      <button onClick={getWeatherData}>Get Weather</button>

      {weatherData && <WeatherCard weatherData={weatherData} />}
    </div>
  );
};

export default WeatherApp;
