const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/weather-app', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

// Handle MongoDB connection events
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define weatherLog Schema
const weatherLogSchema = new mongoose.Schema({
    zip: String,
    temperature: Number,
    description: String,
    dateAdded: String,
});
const WeatherLog = mongoose.model('WeatherLog', weatherLogSchema);

// define weatherFavorite schema
const FavoritesSchema = new mongoose.Schema({
    zip: String,
    dateAdded: String,
});
const Favorite = mongoose.model('Favorite', FavoritesSchema);


// API endpoint to get weather data
app.get('/api/weather/:zip', async (req, res) => {
    const zip = req.params.zip;
    const apiKey = 'fd953eddf6f83f966d9240b60bd6fb26';
    // const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=imperial`;
    // `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=fd953eddf6f83f966d9240b60bd6fb26&units=imperial`

    console.log(zip);
    try {
        const response = await axios.get(apiUrl);
        const { main, weather } = response.data;
        const newWeather = new WeatherLog({
            zip: zip,
            temperature: main.temp,
            description: weather[0].description,
            dateAdded: new Date().toISOString()
        });
        await newWeather.save();
        res.json(newWeather);
    } catch (error) {
        res.status(500).json(error);
    }
});

// About page
app.get('/api/weather/about', async (req, res) => {
    
});


//app.delete
app.delete('/api/weather/delete', async (req, res) => {

});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
