//weather_index.js
const path = require('path') 
const express = require('express')  
const rp = require('request-promise')  
const exphbs = require('express-handlebars')
const port = 3000
var fileName = "../config/accuweather_credentials.json"

const app = express()

try {
credentials = require(fileName)
} 
catch(err) {
  credentials = {}
  console.log("unable to read file '" + fileName + "': ", err)
};

app.engine('.hbs', exphbs({  
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, '../views/layouts')
}))
app.set('view engine', '.hbs')  
app.set('views', path.join(__dirname, '../views'))

app.get('/:city', (req, res) => {
  //console.log("The city in the parameter is "+req.params.city);
  rp({
    uri: 'http://dataservice.accuweather.com/locations/v1/cities/search',
    qs: {
      q: req.params.city,
      apikey: credentials.apikey
         // Use your accuweather API key here
    },
    json: true
  })
    .then((data) => {
      //console.log("The Country's EnglishName is "+data[0].Country.EnglishName)
      res.render('index', { city: data[0].EnglishName, country: data[0].Country.EnglishName})
    })
    .catch((err) => {
      console.log(err)
      res.render('error')
    })
})
app.listen(port)