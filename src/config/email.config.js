const mailerhbs = require('nodemailer-express-handlebars')

const email = {
    send: (transporter, mailMessage) => {
        const folderPath = './src/templates/views'

        const handlebarOptions = {
            viewEngine: {
                partialsDir: folderPath,
                defaultLayout: `${folderPath}/layout`
            },
            viewPath: folderPath
        }

        return new Promise((resolve, reject) => {
            try {
                transporter.use('compile', mailerhbs(handlebarOptions))

                transporter.sendMail(mailMessage, (error, info) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(info)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = email