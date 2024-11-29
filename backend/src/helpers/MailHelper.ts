import Admin from "../models/Admin";
import User from "../models/School";
const nodemailer = require("nodemailer");
import moment = require("moment");

export class MailHelper {
  constructor() {}
  static async sendMail(userId, subject) {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    let mailOptions;
    let userData = await Admin.findOne({ _id: userId });
    let htmlContent = `<!DOCTYPE html>
<html lang="en">
<body style="margin:0">
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"> 
<table style="border-collapse: collapse;padding: 0;margin: 0px auto;text-align: center;font-size: 17px;font-family: 'Poppins', sans-serif;
" width="600px" bgcolor="#f7f7f7">
  <thead>
    <tr>
      <td style="padding: 15px 30px 10px;">
        <a href="#"><img style="max-width: 270px;" src="http://13.50.11.124:5353/img/logo.png"></a>
      </td>
    </tr>
  </thead>
  <tbody style="background: #fff;">
    <tr>
      <td style="padding: 50px 30px;border: solid 1px #f7f7f7;">
        <img src="http://13.50.11.124:5353/img/lock.png" style="max-width: 150px;">

        <h3 style="margin: 30px auto 15px;font-size: 38px;text-transform: uppercase;color: #383838;max-width: 70%;font-weight: 900;line-height: 1.2;">Forgot your Password!</h3>
        <p style="font-size: 26px;margin-bottom: 0;line-height: 1.5;font-weight: bold;">Hello ${
          userData ? userData.name : ""
        },</p>
        <p style="margin-top: 10px;line-height: 1.5;">There was a request to change your password!</p>
        <a href="#" style="background: linear-gradient(to left, #eba35a, #185250 );color: #fff;text-decoration: none;text-transform: uppercase;padding: 20px 50px;border-radius: 5px;margin-top: 10px;display: inline-block;font-weight: 600;letter-spacing: 1px;font-size: 20px;">${
          userData ? userData.verification_code : ""
        }</a>
      </td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td style="padding: 30px;font-size: 14px;">Copyright © 2024 Taxi. All rights reserved.</td>
    </tr>
  </tfoot>
</table>
</body>


</html>


`;

    mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: userData.email,
      subject: subject,
      html: htmlContent,
    };
    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  }
}

export default MailHelper;
