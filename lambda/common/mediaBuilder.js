const Alexa = require('ask-sdk-core')
const { supportsDisplay } = require('./supportsDisplay')
const { videoTemplate } = require('./videoTemplate')

// Builder that return video or audio according to the device
module.exports.mediaBuilder = (handlerInput, url) => {
    if(supportsDisplay(handlerInput)) {
        const template = videoTemplate(url, 0)
        
        return handlerInput
            .responseBuilder
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.1',
                document: template})
            .getResponse()
            
    } else {
        return handlerInput
            .responseBuilder
            .addAudioPlayerPlayDirective("REPLACE_ALL", url, '1234', 0)
            .getResponse()
    }
}