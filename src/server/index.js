var path = require('path');
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const Geonames = require('geonames.js');
const { dateDiffInDays } = require('./helper.js');
const dotenv = require('dotenv');
dotenv.config();

const travelData = {}

const geonames = new Geonames({
  username: process.env.geonamesID,
  lan: 'en',
  encoding: 'JSON'
});

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use(express.static('dist'))

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log('App listening on port 8081!')
})

app.get('/locationInfo', async function (req, res) {
  try {
    // Calculate difference between future and current date
    const currentDate = new Date();
    const targetDate = new Date(req.query.date);
    const difference = dateDiffInDays(currentDate, targetDate);
    if (difference > 15) {
      const maxDate = new Date()
      maxDate.setDate(maxDate.getDate() + 16);
      res.send({success:false, message: `Cannot see this much into the future. The furthest date to forecast the weather is ${maxDate}.`})
      return 
    }

    // Get location data
    const results = await geonames.search({ name_equals: req.query.location })
    if (results.totalResultsCount === 0) {
      res.send({success:false, message: `Oops! It seems like this location doesn't exist. Try again!`})
      return
    }
    const city = results.geonames[0];

    // Get weather data
    const getWeatherRaw = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${city.lat}&lon=${city.lng}&key=${process.env.weatherbitKEY}`)
    const getWeatherJson = await getWeatherRaw.json();

    // Store weather info in an object
    const weatherData = {};
    weatherData.high = getWeatherJson.data[difference].max_temp;
    weatherData.low = getWeatherJson.data[difference].min_temp;
    weatherData.general = getWeatherJson.data[difference].weather.description;

    // Get image of location
    const getImageRaw = await fetch(`https://pixabay.com/api/?key=${process.env.pixabayKEY}&q=${req.query.location}&orientation=vertical`);
    const getImageJson = await getImageRaw.json();

    // Add info to travelData
    travelData.location = city.name;
    travelData.country = city.countryName;
    travelData.departure = req.query.date;
    travelData.days = difference;
    travelData.weather = weatherData;
    travelData.imageURL = getImageJson.hits[0].largeImageURL;
    res.send(travelData);

  } catch (err) {
    res.send({success:false, message: err.message})
    //console.error(err);
  }
})