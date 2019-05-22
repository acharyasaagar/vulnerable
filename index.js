const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const ejs = require('ejs')
require('dotenv').config()

const router = require('./router')
const models = require('./models')

const { isAuthenticated } = require('./services/customer/authentication.service')


const { sequelize, Customer, Item, Transaction } = models

sequelize
.authenticate()
.then(_ => {
  // sequelize.sync({force: true})
  console.log(`\nDatabase connected succesfully`)
  app.listen(3000, () => {
    console.log(`\nServer started at port 3000`)
  })
})
.catch(err => console.error(`\nError connecting to database`))

// application middlewares
app.use(bodyParser.json())
app.use(cookieParser())
app.set('view engine', 'ejs')

// static routes that return html
app.use('/auth', express.static(__dirname+'/public'))
app.use('/register', express.static(__dirname+'/public'))
// app.use('/products', isAuthenticated, express.static(__dirname+'/public/products'))
app.use('/products', isAuthenticated, function(req, res) {
  if (req.user) {
    res.render('products')
  }
})

app.use('/', express.static(__dirname+'/public'))

// express router with routes to post data and interact with database
app.use(router)

