'use strict'
const nodemailer = require('nodemailer');
const config = require('../helpers/config');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.emailserver,
        pass: config.password
    }
});
const emailView = (req, res, next) => {
    res.render('email');
}
const sendEmail = (req, res, next) => {
    try {
        const {emailobject} = req.body;
        const files = req.files;
        if (emailobject) {
            const email = JSON.parse(emailobject);
            const mailoptions  = {
                from: config.emailserver,
                to: email.emailto,
                cc: email.emailcc,
                bcc: email.emailbcc,
                subject: email.subject,
                html: email.body,
                attachments: files
            }; 
            transporter.sendMail(mailoptions, function(err, info){
                if (err) {
                    console.log(error);
                }else {
                    console.log('Email Send' + info.response);
                }
            });
        }
        res.status(200).send('Email Sent Successfully');
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {
    emailView,
    sendEmail
}