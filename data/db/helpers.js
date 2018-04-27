const newUser = require('./models/newUser');
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


// Register a new User. Will return boolean for user creation.
const register = ({ username, password }, cb) => {
  // Checks if username is taken
  let hold = JSON.stringify(userAvailable(username, (err, available) => {
    if (err) { console.log('Error in Mongo Find func', err); }
        
    if (available === true) {
      // Hashing Password
      hashPass(password, (err, hash) => {
        let createUser = new newUser({
          username: username,
          password: hash
        });
        // Insert new User
        createUser.save((err, data) => {
          if (err) {
            console.log('There was a DB insertion error: ', err);
            cb(err, null);
          }

          cb(null, userCreated = true);
        });
      });
    } else {

      cb(err, userCreated = false);
    }
  }));
};

// Checks if username is already in DB
const userAvailable = (username, cb) => {
  let hash = '';
  newUser.find({
    username: username
  }, (err, data) => {
    if (err) { cb(err, null); }
    if (JSON.stringify(data) === '[]') {
      data = true; 
    } else {
      hash = data[0].password;
      data = false;
    }
    cb(null, data, hash);
  });
};

// Hash Password. Will return hash.
const hashPass = (password, cb) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, null, (err, hash) => {
      if (err) { cb(err, null); }
      cb(null, hash);
    });
  });
};


// Authenticate Passwords. Will return boolean. 
const authCheck = ({ username, password }, cb) => {
  let dbHash = '';
  let passHash = '';
  let authenticated = false;

  // If User Exist, Get Hash
  userAvailable(username, (err, data, hash) => {
    if (err) { 
      err = 'Username does not exist!'; 
      cb(err, null);
    }

    dbHash = hash;

    bcrypt.compare(password, dbHash, (err, result) => {
      if (err) { 
        console.log('There was a hashing error: ', err);
        cb(err, null);
      }
      // Bcrypts compare function returns a simple boolean as result
      // Passing that along here
      cb(null, authenticated = result);
    });
  });
};

// Checks DB for duplcate favorite listings
uniqueListingChecker = ({ username, favorite }, cb) => {
  let dup = false;

  newUser.findOne({username: username}, (err, user) => {
    user.favorites.forEach((item) => {
      // MongoDB lacks Array Duplication Prevention
      // So we are going to use the url of our favorite objects
      if (item.url === favorite.url) {
        dup = true;
      }
    });
    cb(dup);
  });
};

// Insert new listing into DB
insertFav = ({ username, favorite }, cb) => {
  newUser.findOneAndUpdate({
    username: username 
  }, {
    $push: {favorites: favorite}
  }, (err, user) => {
    if (err) { cb(err, null); }
    // user.favorites is array of favorites
    cb(null, data = user.favorites);
  });
};

// Remove listing from DB
removeFav = ({ username, favorite }, cb) => {
  newUser.update({
    username: username
  }, {
    // Remove favorites listing based on unique url
    $pull: { favorites: { url: favorite.url } }
  }, (err, user) => {
    if (err) { cb(err, null); }
    cb(null, user);
  });
};

<<<<<<< HEAD
insertFav = ({ username, favorite }, cb) => {
  newUser.findOne({ username: username }, (err, user) => {
    if (err) { cb(err, null); }
    user.favorites.push(favorite);
    cb(null, data = 'Successful');
    
  });
};

=======
// Verifys that user token is valid
>>>>>>> 4d990859cb244ca7151ca84ba44909087caab93f
verifyToken = ({ token }, cb) => {
  jwt.verify(token, 'secretkey', function (err, data) {
    if (err) { cb(err, null); }
    cb(null, data);
  });
};


module.exports = {
  authCheck,
  insertFav,
  register,
  removeFav,
  uniqueListingChecker,
  userAvailable,
<<<<<<< HEAD
  authCheck,
  insertFav,
=======
>>>>>>> 4d990859cb244ca7151ca84ba44909087caab93f
  verifyToken
};