var path = require('path');
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const Geonames = require('geonames.js');
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

app.get('/', function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log('App listening on port 8081!')
})

// Function to get the difference between current date and the travel date
const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}


app.get('/locationInfo', async function (req, res) {
  try {
    // Get location data
    const results = await geonames.search({ name_equals: req.query.location })
    const city = results.geonames[0];

    // Get weather data
    const getWeatherRaw = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${city.lat}&lon=${city.lng}&key=${process.env.weatherbitKEY}`)
    const getWeatherJson = await getWeatherRaw.json();

    // Get weather data of a particular day
    const a = new Date(),
      b = new Date(req.query.date),
      difference = dateDiffInDays(a, b);

    // Store weather info in an objects
    const weatherData = {};
    weatherData.high = getWeatherJson.data[difference].max_temp;
    weatherData.low = getWeatherJson.data[difference].min_temp;
    weatherData.general = getWeatherJson.data[difference].weather.description;

    // Get image of location
    const getImageRaw = await fetch(`https://pixabay.com/api/?key=${process.env.pixabayKEY}&q=${req.query.location}&orientation=vertical`);
    const getImageJson = await getImageRaw.json();

    // Add info to travelData
    travelData.location = req.query.location;
    travelData.departure = req.query.date;
    travelData.days = difference;
    travelData.weather = weatherData;
    travelData.imageURL = getImageJson.hits[0].largeImageURL;
    res.send(travelData);

  } catch (err) {
    console.error(err);
  }
})