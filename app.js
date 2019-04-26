// pull in modules for express
const express = require('express');
const app = express();
const path = require('path');
const port = 8080;

const sequelize = require('./utils/sequelize.js');

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

  sequelize.sync({force: true})
    .then(()=>{
      console.log("Successfully synced the model");
      Team.create({
          teamName: 'Miami Dolphins',
          teamLogo: 'https://i.ytimg.com/vi/F8aAA-BOEyg/maxresdefault.jpg',
          history: 'God\'s gift to earth',
          record: '17-0',
          touchdowns: 100,
          totalYards: 10000,
          player1: 'Dan Marino',
          player2: 'Don Morina',
          player3: 'Man Dorino',
          coach1: 'Don Shula',
          coach2: 'Adam Gase',
          coach3: 'Nick Saban'
        })
          .then((team) =>{
            Player.create({
              playerName: 'Dan Marino',
              bio: ' A wonderful soul',
              stat1: '520000 Touchdowns',
              stat2: '0 superbowls',
              stat3: '50000 clout'
            })
              .then((danTheMan) => {
                Player.create({
                  playerName: 'Cameron Wake',
                  bio: 'Seems pretty cool I guess',
                  stat1: '500 Tackles',
                  stat2: '1 superbowl(s)',
                  stat3: '10000 clout'
                })
                  .then((wakeZilla) => {
                    team.setPlayers([danTheMan, wakeZilla])
                      .then(() => {
                        console.log('Players created and stored');
                      });
                  })
                    .then(() =>{
                      Coach.create({
                        coachName: 'Don Shula',
                        bio: ' a true legend',
                        stat1: 'god tier',
                        stat2: 'perfect season',
                        stat3: 'legend dairy',
                      })
                        .then((don) =>{
                          team.setCoaches(don)
                            .then(() => {
                              console.log('one coach added');
                            });
                        });
                    });
                  });
          })
        .catch((err) => {
          console.log('unable to create team');
        });
      })
      // end of sync
      .catch((err)=> {
        console.log("unable to sync model:", err);
      });
})
.catch((err) => {
  // not Successfully
  console.log("Could not authenticate:", err);
});
