const profiles = require('../config/profiles.config')
const template = require('../config/template-merge.config')
const email = require('../config/email.config')

module.exports = async (req, res) => {
    const { profileName, message } = req.body

    const profile = profiles.get(profileName)
    if (profile === null) {
        return res.status(400).send('Unable to find a matching profile name.')
    }

    // [profile.address] properties will overwrite [message] properties if exists
    const mailMessage = template.merge({ ...message, ...profile.address })
    if (mailMessage === null) {
        return res.status(400).send('Unable to find a matching template in message context.')
    }

    const response = await email.send(profile.transporter, mailMessage)
        .catch(error => {
            console.log(error)
            return error
        })

    if (!response['messageId']) {
        return res.status(400).json(response)
    } else {
        return res.status(200).json(response)
    }
}