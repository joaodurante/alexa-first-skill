const Alexa = require('ask-sdk-core')
const { supportsDisplay } = require('../../common/supportsDisplay')

module.exports.AgeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AgeIntent'
    },
    async handle(handlerInput) {
        const speakOutput = `Ótimo, gostaria de iniciar o trailer agora?`
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
        
        sessionAttributes.age = handlerInput.requestEnvelope.request.intent.slots.age.value
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};