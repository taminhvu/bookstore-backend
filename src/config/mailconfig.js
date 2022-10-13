const nodemailer = require('nodemailer');
require('dotenv').config();


let smtpTransport = nodemailer.createTransport({
    service: "gamail",
    auth: {
        type: "OAuth2",
        user: process.env.EMAILUSER,
        clientId:process.env.CLIENTID,
        clientSecret:process.env.CLIENTSECRET,
        refreshToken:process.env.REFRESHMAILTOKEN,
        accessToken:process.env.ACCESSMAILTOKEN,
    }
});
