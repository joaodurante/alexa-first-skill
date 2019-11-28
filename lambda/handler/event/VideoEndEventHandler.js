const Alexa = require('ask-sdk-core');

module.exports.VideoEndEventHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'Alexa.Presentation.APL.UserEvent' && request.arguments[0] === 'videoend';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
        
        // STATUS = end -> alexa finished playing the trailer
        sessionAttributes.status = 'end'
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
        const speakOutput = 'Deseja repetir, ou assistir o próximo trailer?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};