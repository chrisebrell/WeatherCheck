// src/components/WeatherCard.js
import React from 'react';

const WeatherCard = ({ weatherData }) => {
  return (
    <div>
      <h2>{weatherData.name}</h2>
      <p>{weatherData.weather[0].description}</p>
      <p>Temperature: {weatherData.main.temp}°F</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
    </div>
  );
};

export default WeatherCard;
