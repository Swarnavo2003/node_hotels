const passport = require("passport");
const LocalStratergy = require("passport-local").Strategy;
const Person = require("./models/Person");
passport.use(
  new LocalStratergy(async (username, password, done) => {
    try {
      // console.log("Received credentials:", username, password);
      const user = await Person.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }

      const isPassword = await user.comparePassword(password);
      if (isPassword) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport; // export configured password
