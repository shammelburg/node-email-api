const validateApiKey = require("../helpers/api-key-validator.helper")

const authenticate = (req, res, next) => {

    // Check HTTP Custom Header
    if (!req.headers['x-api-key']) {
        return res.status(401).send('Custom HTTP Header not present.')
    }

    // Set API Key
    const apiKey = req.headers['x-api-key']

    // Check API Key is valid
    const isValid = validateApiKey(apiKey)

    if (!isValid) {
        return res.status(401).send('API Key is invalid.')
    }

    next()
}

module.exports = authenticate