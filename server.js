const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse json data and cors
app.use(express.json());
app.use(cors());

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

// Define user schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});
const User = mongoose.model('User', userSchema);

// Define weatherFavorite schema
const favoritesSchema = new mongoose.Schema({
    zip: String,
    dateAdded: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model
});
const Favorite = mongoose.model('Favorite', favoritesSchema);

//login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password })
        if (user) {
            res.status(200).json({ message: 'Login successful', userId: user._id });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.log('Error during login', error);
        res.status(500).json({ message: 'Internal server error'})
    }
})

// API endpoint to get weather data
app.get('/api/weather/:zip', async (req, res) => {
    const zip = req.params.zip;
    const apiKey = 'fd953eddf6f83f966d9240b60bd6fb26';
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=imperial`;

    console.log(zip);
    try {
        const response = await axios.get(apiUrl);
        const { main, weather } = response.data;
        const newWeather = new WeatherLog({
            zip: zip,
            temperature: main.temp,
            description: weather[0].description,
            dateAdded: new Date().toISOString(),
        });
        await newWeather.save();
        res.json(newWeather);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Endpoint to save zip code to favorites
app.post('/api/save-zipcode', async (req, res) => {
    const { zip, userId } = req.body; // Include userId in the request body

    try {
        const newFavorite = new Favorite({
            zip: zip,
            dateAdded: new Date().toISOString(),
            userId: userId, // Assign the userId to the favorite
        });
        await newFavorite.save();
        res.status(201).json({ message: 'ZIP code saved successfully' });
    } catch (error) {
        console.error('Error saving ZIP code:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint for favorites
app.get('/api/favorite-list', async (req, res) => {
    try {
        const list = await Favorite.find().populate('userId'); // Populate the userId field
        res.status(200).json(list);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Endpoint to delete favorite by ID
app.delete('/api/favorite/:id', async (req, res) => {
    try {
        const result = await Favorite.findOneAndDelete({ _id: req.params.id }).exec();
        res.status(200).json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Endpoint for user registration
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        //check if the username already exists
        const existingUser = await User.findOne({ username })

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists. Choose a different username' })
        }

        //if the username does not exist, create new user
        const newUser = new User({
            username: username,
            password: password,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
