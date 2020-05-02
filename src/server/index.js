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

console.log(__dirname)

app.get('/', function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log('Example app listening on port 8081!')
})

app.get('/locationInfo', async function (req, res) {
  // async/await
  try {
    const results = await geonames.search({ name_equals: req.query.location })
    const city = results.geonames[0];
    fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${city.lat}&lon=${city.lng}&key=${process.env.weatherbitKEY}`)
    .then(res => res.json())
    .then(json => console.log(json));
    
    
    // res.send({lng: city.lng, lat: city.lat});
  } catch (err) {
    console.error(err);
  }
})