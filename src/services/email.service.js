const nodemailer = require("nodemailer");
const getObjMailConfig = require("../config/mailconfig");


const transportfc = async()=>{
  const smtp = await getObjMailConfig()
  return nodemailer.createTransport(smtp);
} 

const sendEmail = async (to, subject, text) => {
  const msg = { to, subject, text };
  const transport = await transportfc();
  return new Promise((resolve, reject) => {
    transport.sendMail(msg, (error, resoponse) => {
      if (error) return reject(error);
      return resolve(resoponse);
    });
  });
};

const sendVerificationEmail = async (to,token) => {
  const subject = "Email Verification";
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://example?token=${token}`;
  const text = `Dear user,To verify your email, click on this link: ${verificationEmailUrl} If you did not create an account, then ignore this email.`;
  return sendEmail(to,subject,text); 
};

module.exports = {
  transportfc,
  sendEmail,
  sendVerificationEmail,
};
