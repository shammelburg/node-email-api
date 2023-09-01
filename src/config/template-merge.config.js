const layout = require("../templates/context/layout");

const template = {
    merge: (messageContext) => {

        // These are default values for merging object below
        let templateContext

        // This throw an error if the template does not exist
        try {
            templateContext = require("../templates/context/" + messageContext.template)
        } catch (error) {
            return null
        }

        // Merge default and messageContext values 
        const mergedMessage = {
            ...messageContext,
            // Merge email contexts
            context: {
                ...(layout.context || {}),                  // First
                ...(templateContext?.context || {}),        // Second overwrites Frirst
                ...(messageContext?.context || {}),         // Third overwrites Second
            },
            // Merge attachments
            attachments: [
                ...(layout.attachments || []),
                ...(templateContext?.attachments || []),
                ...(messageContext?.attachments || []),
            ]
        }

        return mergedMessage
    }
}

module.exports = template