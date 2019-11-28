const Alexa = require('ask-sdk-core')
const { mediaBuilder } = require('../../common/mediaBuilder')

module.exports.YesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'YesIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'NextVideoIntent')
    },
    async handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()

        if (sessionAttributes.age) {                                                                // Start video if age is defined, else ask the age
            if (sessionAttributes.videoCounter !== undefined
                && sessionAttributes.videoCounter < sessionAttributes.videoListSize - 1)            // When videoCounter > videoListSize -> videoCounter reset
                sessionAttributes.videoCounter++
            else
                sessionAttributes.videoCounter = 0

            sessionAttributes.status = 'play'                                                       // STATUS = play -> alexa is playing the trailer
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes)

            const speakOutput = 'Reproduzindo o trailer'
            return mediaBuilder(handlerInput, sessionAttributes.videoCounter, 0, speakOutput)       // Call mediaBuilder and return its value

        } else {
            const speakOutput = 'Por favor, informe a sua idade'
            return handlerInput
                .responseBuilder
                .speak(speakOutput)
                .reprompt('Qual a sua idade?')
                .getResponse();
        }
    }
}
