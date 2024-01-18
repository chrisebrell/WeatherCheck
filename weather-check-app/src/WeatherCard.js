// src/components/WeatherCard.js
import React from 'react';

const WeatherCard = ({ weatherData }) => {

  const getIconUrl = (iconCode) => `http://openweathermap.org/img/w/${iconCode}.png`;

  const suggestClothing = (temperature, description) => {
    if (temperature < 32) {
      return 'It\'s very cold. Bundle up with multiple layers, a heavy jacket, scarf, gloves, and a hat.';
    } else if (temperature >= 32 && temperature < 50) {
      return 'It\'s cold. Wear a warm jacket, layers, and don\'t forget your gloves.';
    } else if (temperature >= 50 && temperature < 68) {
      if (description.toLowerCase().includes('rain')) {
        return 'It\'s cool with rain. Wear a waterproof jacket and bring an umbrella.';
      } else {
        return 'It\'s cool. Consider wearing a sweater or light jacket.';
      }
    } else if (temperature >= 68 && temperature < 80) {
      if (description.toLowerCase().includes('rain')) {
        return 'It\'s mild with rain. Wear a light rain jacket and comfortable clothes.';
      } else {
        return 'It\'s mild. Dress in light layers, a t-shirt, and jeans.';
      }
    } else if (temperature >= 80 && temperature < 90) {
      if (description.toLowerCase().includes('rain')) {
        return 'It\'s warm with rain. Wear light, breathable clothes and carry a small umbrella.';
      } else {
        return 'It\'s warm. Opt for shorts, a t-shirt, and sunglasses.';
      }
    } else {
      if (description.toLowerCase().includes('thunderstorm')) {
        return 'There\'s a thunderstorm. Stay indoors, and avoid going outside.';
      } else if (description.toLowerCase().includes('snow')) {
        return 'It\'s snowy. Dress warmly with a winter coat, boots, and layers.';
      } else {
        return 'It\'s hot. Wear light and breathable clothing like shorts, a tank top, and a hat.';
      }
    }
  };


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
