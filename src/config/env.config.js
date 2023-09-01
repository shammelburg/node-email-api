const env = {
    api: {
        valid_keys: process.env.API_KEYS || '',
    },
    email: {
        gmail: {
            email: process.env.GMAIL_EMAIL || '',
            password: process.env.GMAIL_PASSWORD || ''
        },
        sendgrid: {
            email: process.env.SENDGRID_EMAIL || '',
            api_key: process.env.SENDGRID_API_KEY || ''
        },
        office365: {
            email: process.env.OFFICE365_EMAIL || '',
            password: process.env.OFFICE365_PASSWORD || '',
        }
    }
}

module.exports = env