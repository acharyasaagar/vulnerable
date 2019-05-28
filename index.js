const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const ejs = require('ejs')
const path = require('path')
require('dotenv').config()

const router = require('./router')
const models = require('./models')
const { seedCustomers, seedItems } = require('./seed.db')

const { isAuthenticated, isAuthenticatedAsAdmin } = require('./services/customer/authentication.service')
const { getAllProducts } = require('./services/products/products.service')

const { sequelize, Customer, Item, Transaction } = models

sequelize
.authenticate()
.then(async _ => {
  await sequelize.sync({force: true})
  await seedCustomers()
  await seedItems()
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

// static routes
app.use('/static', express.static('public'))

app.use('/static/products', isAuthenticated, async function(req, res) {
  if (req.user) {
    try {
      const products = await getAllProducts()
      return res.render('products', { 
        user: req.user,
        products 
      })
    } catch(err) {
      return res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
      }).end()
    }
  }
  return res.send('Internal Server Error')
})

app.use('/static/invoice', isAuthenticated, async function(req, res) {
  res.render('invoice', { transaction: req.query })
})

// app.use('/static/admin', isAuthenticated, function(req, res) {
//   if(req.admin) {
//     res.render('admin',{ user: req.admin })
//   }
// })

// express router with routes to post data and interact with database
app.use(router)


function nocache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  res.header('Expires', '-1')
  res.header('Pragma', 'no-cache')
  next()
}
