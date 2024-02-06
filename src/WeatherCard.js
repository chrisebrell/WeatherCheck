import React from 'react';

const weatherCard = ({ weatherData }) => {

  const getIconUrl = (iconCode) => `http://openweathermap.org/img/w/${iconCode}.png`;

  const getTemperatureCategory = (temp) => {
    if (temp < 50) {
      return 'cold';
    } else if (temp >= 50 && temp < 75) {
      return 'moderate';
    } else {
      return 'warm';
    }
  };

  const getSuggestedClothing = (temp, description) => {
    const temperatureCategory = getTemperatureCategory(temp);

    switch (temperatureCategory) {
      case 'cold':
        return 'Bundle up! Wear warm layers.';
      case 'moderate':
        return 'Wear a light jacket or sweater.';
      case 'warm':
        return 'Dress lightly and stay cool.';
      default:
        return 'Check weather conditions for clothing advice.';
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

      <p>Suggested Clothing: {getSuggestedClothing(weatherData.main.temp, weatherData.weather[0].description)}</p>

    </div>
  );
};

export default weatherCard;
