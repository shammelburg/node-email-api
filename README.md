
 ## Node Email API

The API is built on top of Node.js with Express.js, Nodemailer and Handlebars. 

Sending emails can be a challenge at times, especially consistent, responsive and well designed HTML emails with all the css goodness.

### Feature list
* Single POST endpoint for emails
* Secured with API Keys (must serve over HTTPS in production)
* No database required (can be added if required)
* Configurations for
    * Transports (Create transports for Gmail, SendGrid and Office365)
    * Profiles (One or more transport definitions)



### Transport Configurations

**SendGrid**
* You will need a **SendGrid API Key**, you can be generated once you have an account.

**Gmail**
* You must have a Gmail account and enable **App Passwords**, this will be the password used in the API.
* https://support.google.com/accounts/answer/185833?hl=en

**Office 365**
* You must have an Office 365 account with an active **Office 365 E3 license** and have **Authenticed SMTP** access.
* If your account has 2FA enabled, you must also create an App Password to be used in the API.
* https://mysignins.microsoft.com/security-info


### Getting Started

Download or clone the project, then run `npm install` to install required dependencies.

Create a `.env` file in the root for app secrets. See `.env-example`, copy content into the new file and set the credentials for the transport you are using.

Use an API client like Postman to add the following.

* Method: `POST`
* URL: `http://localhost:3000/email`
* Header: `x-api-key` (and value).
* Body: (below)
* Set `profileName` to match transport.
```csharp
// development01 = gmail
// development02 = office365
// development03 = sendgrid
{
    "profileName": "development01",
    "message": {
        "to": [
            "your@email.address"
        ],
        "subject": "🥳 Node Email Service",
        "template": "example-1", // must match template naming
        "context": {
            "name": "Your Name"
        }
    }
}
```

## Further Configuration
#### Profiles

`src/config/profiles.config.js`

This file allows you to create a profiles for a given transport. Each profile also has a `from` address object as required by most service providers.

```csharp
// Example using the Gmail transport for profile 'development01'
case 'development01':
    return {
        transporter: transport.createGmail(env.email.gmail.email, env.email.gmail.password),
        address: {
            to: ['...'], // This will overwrite the [to] prop from request body [message.to]
            from: {
                name: 'Gmail Node Email API',
                address: env.email.gmail.email
            }
        }
    }
    // More profiles in the switch statement
```

#### Templates

Templates require 2 files, a view (`.handlebars`) and context (`.js`) file. These must be in the following folders with the same file name. 
* `/src/templates/context/example-1.js` 
    * The context file must exist.
    * It must export an object with optional default values. (can be empty `module.export = {}`)
    * This file will be merged with the `layout.js` file and request body.
* `/src/templates/view/example-1.handlebars`
    * This file contains the HTML within the `layout.handlebars` file.

Analyse the files to understand how to embed images and data. 


The message configuration is combination of 
* Nodemailer 
    * https://nodemailer.com/message/
* Nodemailer Express Handlebars
    * This replaces Nodemailers `text` + `html` options with `template` + `context`.
    * https://www.npmjs.com/package/nodemailer-express-handlebars