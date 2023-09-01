const transport = require('./transport.config')
const env = require('./env.config')

/**
 * Profile address object will overwrite/replace the request body message properties
 * This way you can create a profile with specific properties e.g. default To, CC, BCC address + more
 */
const profiles = {
    get: (profileName) => {
        switch (profileName) {
            case 'development01':
                return {
                    transporter: transport.createGmail(env.email.gmail.email, env.email.gmail.password),
                    address: {
                        // to: [''],
                        from: {
                            name: '[Gmail] Node Email API',
                            address: env.email.gmail.email
                        }
                    }
                }
            case 'development02':
                return {
                    transporter: transport.createOffice365(env.email.office365.email, env.email.office365.password),
                    address: {
                        from: {
                            name: '[Office365] Node Email API',
                            address: env.email.office365.email
                        },
                    }
                }
            case 'development03':
                return {
                    transporter: transport.createSendGrid(env.email.sendgrid.api_key),
                    address: {
                        from: {
                            name: '[SendGrid] Node Email API',
                            address: env.email.sendgrid.email
                        }
                    }
                }
            default:
                return null
        }
    }
}

module.exports = profiles