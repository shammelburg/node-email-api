const nodemailer = require('nodemailer')

const transport = {
    /**  Create GMAIL nodemailer transport with the provided parameters. */
    createGmail: (emailAddress, password) => nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailAddress,
            pass: password
        }
    }),
    /**  Create SendGrid nodemailer transport with the provided parameters. */
    createSendGrid: (sendGridApiKey) => nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 587,
        auth: {
            user: 'apikey',
            pass: sendGridApiKey
        }
    }),
    /**  Create Office 365 nodemailer transport with the provided parameters. */
    createOffice365: (emailAddress, password) => nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        auth: {
            user: emailAddress,
            pass: password
        }
    })
}

module.exports = transport