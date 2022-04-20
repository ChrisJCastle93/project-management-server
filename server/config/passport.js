const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User.model");
const bcrypt = require("bcryptjs"); // !!!

// called on login, saves the id to session req.session.passport.user = {id:'..'}
// passport.serializeUser((user, done) => {
//   done(null, { _id: user._id });
// });

// // user object attaches to the request as req.user
// passport.deserializeUser((id, done) => {
//   User.findOne({ _id: id }, "email", (err, user) => {
//     done(null, user);
//   });
// });

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession, (err, userDocument) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, userDocument);
  });
});
 

passport.use(
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email", // not necessary, DEFAULT
    },
    function (req, email, password, done) {
      console.log("finding USER");
      User.findOne({ email }, (err, foundUser) => {
        if (err) {
          console.log("passport error");
          done(err);
          return;
        }

        if (!foundUser) {
          console.log("no user");
          done(null, false, { message: "Incorrect email." });
          return;
        }

        if (!bcrypt.compareSync(password, foundUser.password)) {
          console.log("no user - pw");
          done(null, false, { message: "Incorrect password." });
          return;
        }
        console.log("passport-  looking good");
        req.session.currentUser = foundUser;
        done(null, foundUser);
      });
    }
  )
);
