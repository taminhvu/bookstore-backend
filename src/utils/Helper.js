const jwt = require('jsonwebtoken');
const Helper = {
    getAccesstoken: (payload,expires) => {
        if (expires) {
            return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: expires});
        } else {
            return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
        }
    },
    
    verifyAccesstoken: (token) => {
      return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    },
}
module.exports = Helper;