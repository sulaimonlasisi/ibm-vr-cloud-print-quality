const path = require('path')  
const express = require('express')  
const rp = require('request-promise')  
const exphbs = require('express-handlebars')
const port = 3000

const app = express()

app.engine('.hbs', exphbs({  
  defaultLayout: 'rising_stack',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')  
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {  
  rp({
    uri: 'http://google.com',
    json: true
  })
    .then((data) => {
      res.render('index', data)
      data: data
    })
    .catch((err) => {
      console.log(err)
      //res.render('error')
    })
})
app.listen(port)
