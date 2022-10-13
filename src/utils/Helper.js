require('dotenv').config();
const jwt = require('jsonwebtoken');
const moment = require('moment');
const Define = require('./Define');
const nodemailer = require('nodemailer');
const SMTPTransport = require('nodemailer/lib/smtp-transport');

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
    sendEMail: (request)=>{
        rand = Math.floor((Math.random() * 1000)+54);
        host = request.get('host');
        link = "http://"+host+"verify?id="+rand;
        mailOptions = {
            to: request.query.to,
            subject: "Plese confirm your Email accout",
            html : "Hello,<br> Please Click on the link to verify you email><br> < href="+link+">Click here to verify</a>"
        }
        console.log(mailOptions);
        SMTPTransport.sendMail(mailOptions,function(err,response){
            if(err){
                console.log(err);
                response.end("err");
            }else{
                console.log("Message sent: " + response.message);
                response.end("sent");
            }
        });
    },
}
module.exports = Helper;