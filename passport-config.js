const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, getUserByEmail, getUserById) {
    // Creating a function that will authenticate users
     const authenticateUser = async (email, password, done) => {
        // get user by email
        const user = getUserByEmail(email);
        // if user is null, return done
        if (user == null) {
            return done(null, false, { message: "No user with that email" });
        }
        try {
            // if user exists, compare the password
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Password Incorrect" });
            }
        } catch (e) {
            console.log(e);
            return done(e);
        }
     }

    passport.use(new localStrategy({ usernameField: "email" }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id));
    });
};

module.exports = initialize;