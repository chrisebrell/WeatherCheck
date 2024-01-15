// src/components/WeatherCard.js
import React from 'react';

const WeatherCard = ({ weatherData }) => {
  return (
    <div>
      <h2>{weatherData.name}</h2>
      <p>{weatherData.weather[0].description}</p>
      <p>Temperature: {weatherData.main.temp}°F</p>
      <p>Feels Like: {weatherData.main.feels_like}°F</p>
      <p>Wind Speed: {weatherData.wind.speed} MPH</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Cloud Coverage: {weatherData.clouds.all}%</p>
      <p>Atmospheric Pressure: {weatherData.main.pressure} hPa</p>
    </div>
  );
};

export default WeatherCard;
