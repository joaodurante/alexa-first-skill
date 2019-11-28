const Alexa = require('ask-sdk-core');

module.exports.FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Não entendi o que você falou, pode repetir novamente?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};