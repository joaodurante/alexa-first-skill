const Alexa = require('ask-sdk-core');

module.exports.AgeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AgeIntent';
    },
    handle(handlerInput) {
        const speakOutput = `${handlerInput.requestEnvelope.request.intent.slots.age.value}, que legal. Gostaria de assistir um trailer de filme?`;
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
        
        sessionAttributes.age = handlerInput.requestEnvelope.request.intent.slots.age.value
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};