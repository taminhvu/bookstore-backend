require('dotenv').config();
const jwt = require('jsonwebtoken');
const moment = require('moment');
const Define = require('./Define');

const Helper = {
    //@get a date after 1 day @return miliseconds
    getExpireDay: (day = 1) => {
        return moment().add(day, Define.DAYS).valueOf();
    },
    getAccesstoken: (payload, expires) => {
        if (expires) {
            return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expires });
        } else {
            return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
        }
    },
    getRefreshtoken: (payload, expires) => {
        if (expires) {
            return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: expires });
        } else {
            return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
        }
    },
    //@return email:String || throw Error
    verifyAccesstoken: (token) => {
      return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    },
    verifyRefreshtoken:(token) =>{
        return jwt.verify(token,process.env.REFRESH_TOKEN_SECRET);
    },
    //
}
module.exports = Helper;