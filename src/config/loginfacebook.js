const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const loginwithfacebook = (app)=>{
    app.use(passport.initialize());
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "https://vqtruong0910.github.io/bookstore-frontend/auths/facebook/callback",
        profileFields: ['id', 'displayName', 'gender', 'picture.type(large)', 'email']
    },
        async function (accessToken, refreshToken, profile, cb) {
            const { provider, _raw, _json, ...user } = profile;
            console.log(user);
            return cb(null, user);
        }
    ));
}

module.exports = loginwithfacebook;