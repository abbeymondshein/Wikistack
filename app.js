const express = require("express");
const morgan = require("morgan");
const Sequelize = require('sequelize')
const wikistack = new Sequelize('postgres://localhost:5432/wikistack')
const { db } = require('./models');
const app = express()
const layout = require("./views/layout")
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

//including morgan to log information about requests
app.use(morgan('combined'))
//for our styling
app.use(express.static(__dirname + "/public"));
//including body parsing middleware aka express urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
//adding in wiki router
app.use('/wiki', wikiRouter);

//console.log("db:",db)
//verify connection to DB
db.authenticate().
then(() => {
  console.log('connected to the database');
})

//requests
app.get('/', function (req, res) {
  res.send(layout(""))
})

const PORT = 3000;

const models = require('./models');

const init = async () => {
  await models.db.sync({force: true})
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
})
};

init();
