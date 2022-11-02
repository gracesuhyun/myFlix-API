const jwtSecret = 'your_jwt_secret'; // This has to be same key used in JWTStrategy

const jwt = require('jsonwebtoken'),
    passport = require('passport');

require('./passport'); // My local passport file

/**
 * function to generate JWT token
 * @param {*} user 
 * @returns signed token
 */
let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.Username, // This is the username encoded in the JWT
        expiresIn: '7d', // This specifies that the token will expire in 7 days
        algorithm: 'HS256' // This is the algorithm used to "sign" or encode values of JWT
    });
};

/**
 * POST user login details
 * @param {*} router 
 */
module.exports = (router) => {
    router.post('/login', (req, res) => {
        passport.authenticate('local', {session: false}, (error, user, info) => {
            if (error || !user) {
                return res.status(400).json({
                    message: 'Something broke',
                    user: user
                });
            }
            req.login(user, {session: false}, (error) => {
                if (error) {
                    res.send(error);
                }
                let token = generateJWTToken(user.toJSON());
                return res.json({user, token});
            });
        })(req, res);
    });
}