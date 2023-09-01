module.exports = (error, req, res) => {

    const errorObject = {
        code: error.code,
        name: error.name,
        details: error.details,
        message: error.message,
        stack: error.stack,
        statusCode: error.statusCode
    }

    // Log to console
    console.log('server_error', errorObject)

    return res.status(500).json(errorObject)
}