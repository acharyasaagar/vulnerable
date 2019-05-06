const express = require('express')
const app = express()
const Sequelize = require('sequelize')
require('dotenv').config()

const {database, username, password, host, dialect} = require('./config')

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect
})

sequelize
  .authenticate()
  .then(_ => {
    console.log(`\nDatabase connected succesfully`)
    app.listen(3000, () => {
      console.log(`\nServer started at port 3000`)
      })
  })
  .catch(err => console.error(`\nError connecting to database`))


app.use(express.static('public'))
