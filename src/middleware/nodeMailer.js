const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  });
  console.log("refresh token"+ process.env.REFRESH_TOKEN +process.env.EMAIL );

  const accessToken = await new Promise((resolve, reject) => {
    
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        console.log("err" + err);
        reject("Failed to create access token :(");
      }
      resolve(token);
    });
  });
  

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN
    }
  });

  return transporter;
};

/*//sending from domain
var transporter = nodemailer.createTransport({
    host: 'something.yourdomain.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'username@mydomain.com', // your domain email address
      pass: 'password' // your password
    }
  });

*/

const sendEmail = async (emailOptions) => {
  let emailTransporter = await createTransporter();
  await emailTransporter.sendMail(emailOptions);
};

/*sendEmail({
  subject: "Test",
  text: "I am sending an email from nodemailer!",
  to: "put_email_of_the_recipient",
  from: process.env.EMAIL
});*/


module.exports = sendEmail