const Alexa = require('ask-sdk-core')
const { getS3PreSignedUrl } = require('../../util')
const { mediaBuilder } = require('../../common/mediaBuilder')

module.exports.RestartVideoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RestartVideoIntent'
    },
    async handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
        
        if(sessionAttributes.status === 'end') {
            sessionAttributes.status = 'play'
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
            
            const url = await getS3PreSignedUrl(`${sessionAttributes.videoCounter}.mp4`)
            
            return mediaBuilder(handlerInput, url)
            
        } else {
            const speakOutput = 'Você não pode fazer isso agora'
            return handlerInput
                .responseBuilder
                .speak(speakOutput)
                .getResponse();
        }
    }
}