var path = require('path')
const express = require('express')
const app = express()

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

app.get('/test', function (req, res) {
    textapi.sentiment({
        'url': req.query.url
      }, function(error, apiResponse) {
        if (error === null) {
          res.send({data: apiResponse})
        }
      });
})