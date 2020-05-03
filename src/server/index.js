var path = require('path');
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const Geonames = require('geonames.js');
const fs = require('fs');
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

console.log(__dirname)

app.get('/', function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log('Example app listening on port 8081!')
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
  // async/await
  try {
    // Get location data
    const results = await geonames.search({ name_equals: req.query.location })
    const city = results.geonames[0];
    // Get weather data
    const getWeatherRaw = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${city.lat}&lon=${city.lng}&key=${process.env.weatherbitKEY}`)
    const getWeatherJson = await getWeatherRaw.json();
    // Write json data to file
    fs.writeFileSync('kacsa.txt', JSON.stringify(getWeatherJson, null, 2));
    // Get weather data of a particular day
    const a = new Date(),
    b = new Date(req.query.date),
    difference = dateDiffInDays(a, b);
    console.log(getWeatherJson.data[difference]);
    // Get image of location
    
    
  } catch (err) {
    console.error(err);
  }
})