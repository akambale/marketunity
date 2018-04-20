var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

var db = require('./data/db/connection');
var helpers = require('./data/db/helpers');


app.use(bodyParser.json()); //if objects return empty, switch to http parsing thing
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', function(request, response) {
  response.send('sup');
  response.end('updog');
});

app.listen(1337, function() {
  console.log('App listening on port 1337');
});


/* 
  TO DO LIST
  1. Create function to create session
  2. Create function to check is uer exists in db


*/

/***********************************************************************/
/***********************************************************************/
/************************* Register Routes *****************************/
/***********************************************************************/
/***********************************************************************/

app.post('/register', function(req, res) {

  const user = {
    username: req.body.username,
    password: req.body.password
  };

  let userCreated = false;
  helpers.register(user, (err, data) => {
    if (err) { console.log( err ); } else {
      userCreated = true;
      res.end(JSON.stringify('User created!'));
    }
  });

  //parse the username and password

  //generate new user
  //then promise
  //check to see if user exists in db
  //if not
  //with bcrypt create user, hash password, create new session
  //if so
  //display some visual error message via res.end()
  //possibly redirect to login?
    


});

/***********************************************************************/
/***********************************************************************/
/************************* Login Routes ********************************/
/***********************************************************************/
/***********************************************************************/


//render login page on request
app.get('/login', function(request, response) {


});

//post username and password to db
app.post('/login', function(req, res) {
  //var username = request.body.username;
  //var password = request.body.password;
  const user = {
    username: req.body.username,
    password: req.body.password
  };

  helpers.authCheck(user, (err, data) => {
    if (err) { console.log(err); }
    console.log(data);
  });

  //add code to create users and such and interface with bcrypt
  //create new user
  //fetch and promise
  //if user is not found
  //display error
  //if user is found
  //check password using bcrypt
  //if password matches
  //create session
  //if password doesnt match
  //throw error
  //redirect to login

});

/***********************************************************************/
/***********************************************************************/
/************************* Logut Routes ********************************/
/***********************************************************************/
/***********************************************************************/


app.get('/logout', function(request, response) {
  //destroy session function
  //redirect to login
});

/***********************************************************************/
/***********************************************************************/
/************************* Wildcard Route ******************************/
/******************* handle all orther requests ************************/
/***********************************************************************/

app.get('/*', function(request, response) {
  //redirect to '/'

  //not sure if anything else is needed

});

