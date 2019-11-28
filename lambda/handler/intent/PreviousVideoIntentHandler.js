const Alexa = require('ask-sdk-core')
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
            
            const speakOutput = 'Reproduzindo trailer anterior'
            return mediaBuilder(handlerInput, sessionAttributes.videoCounter, 0, speakOutput)
            
        } else {
            const speakOutput = 'Você não pode fazer isso agora'
            return handlerInput
                .responseBuilder
                .speak(speakOutput)
                .getResponse();
        }
    }
}