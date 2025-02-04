const { supportsDisplay } = require('./supportsDisplay')
const { videoTemplate } = require('./videoTemplate')
const { getS3PreSignedUrl } = require('../util')

// Builder that return video or audio according to the device
module.exports.mediaBuilder = async (handlerInput, token, offset, speakOutput) => {
    const categoryFolder = handlerInput.attributesManager.getSessionAttributes().categoryFolder
    const url = await getS3PreSignedUrl(categoryFolder, `${token}.mp4`)
    
    if(supportsDisplay(handlerInput)) {
        const template = videoTemplate(url, offset)
        
        return handlerInput
            .responseBuilder
            .speak(speakOutput)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.1',
                document: template})
            .getResponse()
            
    } else {
        return handlerInput
            .responseBuilder
            .speak(speakOutput)
            .addAudioPlayerPlayDirective('REPLACE_ALL', url, token, offset, null)
            .getResponse()
    }
}