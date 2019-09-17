const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');
const User = require('../models/User');

passport.serializeUser((user, done) => {
    console.log("Serialization called!!!!")
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    console.log("DeSerialization called!!!!")
    User.findById(id).then(user => {
      done(null, user);
    });
  });
  

passport.use(new FacebookStrategy({
    clientID: `${process.env.clientID}`,
    clientSecret: `${process.env.clientSecret}`,
    callbackURL: `${process.env.callback}`,
    proxy: true
  },
  async(accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      console.log(profile);
      const existingUser = await User.findOne({facebookID: profile.id});
      if(existingUser){
          return done(null, existingUser);
      }
      const user = await new User({facebookID: profile.id}).save();
      return done(null , user);
  }
));