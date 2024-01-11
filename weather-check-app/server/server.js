const express = require('express')
const mongoose = require('mongoose')
const axios = require('axios')

const app = express()
const PORT = process.env.PORT || 5000;

//connect to MongoDB
mongoose.connect('mongodb://localhost/weather-app', { useNewUrlParser: true, useUnifiedTopology: true });

//define weather Schema 
const weatherSchema = new mongoose.Schema({
    city: String,
    temperature: Number,
    description: String,
})

const Weather = mongoose.model('Weather', weatherSchema)

// API endpoint to get weather data
app.get('/api/weather/:city', async (req, res) => {
    const city = req.params.city;
    const apiKey = ''
    const apiUrl = '' 

    try {
        const response = await axios.get(apiUrl);
        const { main, weather } = response.data;
        const newWeather = new Weather({
            city: city,
            temperature: main.temp,
            description: weather[0].description
        })
        await newWeather.save();
        res.json(newWeather);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch weather data'})
    }
})

app.listen(PORT, () => {
    console.log(`Server os running on port ${PORT}`)
})
