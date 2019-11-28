const Alexa = require('ask-sdk-core')
const { getS3PreSignedUrl } = require('../../util')
const { config } = require('../../common/config')
const { mediaBuilder } = require('../../common/mediaBuilder')

module.exports.PreviousVideoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PreviousVideoIntent'
    },
    async handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
        
        if(sessionAttributes.status === 'play') {
            if(sessionAttributes.videoCounter === 0)
                sessionAttributes.videoCounter = config.LIST_SIZE-1
            else
                sessionAttributes.videoCounter--
                
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