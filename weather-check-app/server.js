const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/weather-app', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

// Handle MongoDB connection events
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define weather Schema
const weatherSchema = new mongoose.Schema({
    city: String,
    temperature: Number,
    description: String,
});

const Weather = mongoose.model('Weather', weatherSchema);

// API endpoint to get weather data
app.get('/api/weather/:city', async (req, res) => {
    const city = req.params.city;
    const apiKey = 'fd953eddf6f83f966d9240b60bd6fb26';
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const { main, weather } = response.data;
        const newWeather = new Weather({
            city: city,
            temperature: main.temp,
            description: weather[0].description,
        });
        await newWeather.save();
        res.json(newWeather);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
