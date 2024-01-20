// src/components/WeatherCard.js
import React from 'react';
import suggestClothing from './clothingSuggestions';

const WeatherCard = ({ weatherData }) => {

  const getIconUrl = (iconCode) => `http://openweathermap.org/img/w/${iconCode}.png`;

  

  return (
    <div>
      <h2>{weatherData.name}</h2>
      <img src={getIconUrl(weatherData.weather[0].icon)} alt="Weather Icon" />
      <p>{weatherData.weather[0].description}</p>
      <p>Temperature: {weatherData.main.temp}°F</p>
      <p>Feels Like: {weatherData.main.feels_like}°F</p>
      <p>Wind Speed: {weatherData.wind.speed} MPH</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Cloud Coverage: {weatherData.clouds.all}%</p>
      <p>Atmospheric Pressure: {weatherData.main.pressure} hPa</p>

      <p>Suggested Clothing: {suggestClothing(weatherData.main.temp, weatherData.weather[0].description)}</p>

    </div>
  );
};

export default WeatherCard;
