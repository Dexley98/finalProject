// pull in modules for express
const express = require('express');
const app = express();
const path = require('path');
const port = 8080;


const sequelize = require('./utils/sequelize.js');


app.use(session({
  store: new FileStore(),
  secret: 'secretigottasecret',
  resave: false,
  saveUninitialized: false,
}));

// pull in model(s)
const Team = require('./models/Team');
const Player = require('./models/Player');
const Coach = require('./models/Coach');


// parsing middle-ware
app.use(express.urlencoded({extended:false}));

// pull in routes
const indexRoutes = require('./routes/index');
const teamRouter = require('./routes/team');
const playerRouter = require('./routes/player');
const coachRouter = require('./routes/coach');

// set up static and pug
app.use(express.static('public'));
app.set('views',path.join(__dirname, "views"));
app.set('view engine', 'pug');

// use routes
app.use('/', indexRoutes);
app.use('/team', teamRouter);
app.use('/players', playerRouter);
app.use('/coaches', coachRouter);


sequelize.authenticate()
.then(() => {
  // successful
  console.log("Successfully authenticated.");
  app.listen(port);
})
.catch((err) => {
  // not Successfully
  console.log("Could not authenticate:", err);
});
