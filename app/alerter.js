const nodemailer = require("nodemailer");
const keys       = require("./keys.js");

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'thequinnftw@gmail.com',
        pass: keys.gmail_password
    }
});

exports.send = function (sub, body) {
    const mailOptions = {
        from: 'API Alerter <alerts@api.quinnftw.com>',
        to: 'thequinnftw@gmail.com',
        subject: sub,
        text: body
    };
    transporter.sendMail(mailOptions, function (error, info) {
    });
}
