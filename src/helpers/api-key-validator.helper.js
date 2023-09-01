const env = require("../config/env.config")

const validateApiKey = (apiKey) => {
    const validApiKeys = env.api.valid_keys || ''
    return validApiKeys.includes(apiKey)
}

module.exports = validateApiKey