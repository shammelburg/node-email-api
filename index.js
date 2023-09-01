const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const helmet = require('helmet')
const morgan = require('morgan')

const errorHandlingMiddleware = require('./src/middleware/error-handling.middleware')
const authenticate = require('./src/middleware/authentication.middleware')

const asyncWrapperHelper = require('./src/helpers/async-wrapper.helper')
const emailController = require('./src/controllers/email.controller')

app.use(bodyParser.json())

app.use(helmet())
app.use(morgan('tiny'))

// Register endpoint
app.post('/email', authenticate, asyncWrapperHelper(emailController))

app.use('**', (req, res) => {
    res.status(404).json('👋 These are not the droids you\'re looking for!')
})

// Error Handling
app.use(errorHandlingMiddleware)

app.listen(process.env.PORT, () => {
    console.log(`Node Email API running on port ${process.env.PORT}`)
})