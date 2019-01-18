const express = require("express");
const morgan = require("morgan");
const Sequelize = require('sequelize')
const wikistack = new Sequelize('postgres://localhost:5432/wikistack')

const app = express()

//including morgan to log information about requests
app.use(morgan('combined'))
//for our styling
app.use(express.static(__dirname + "/public"));
//including body parsing middleware aka express urlencoded
app.use(express.urlencoded({ extended: false }));

//requests
app.get('/', function (req, res) {
  res.send('hello, world!')
})
