const Alexa = require('ask-sdk-core')
const { getS3PreSignedUrl } = require('../../util')
const { mediaBuilder } = require('../../common/mediaBuilder')

module.exports.YesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'YesIntent' 
            || handlerInput.requestEnvelope.request.intent.name === 'NextVideoIntent')
    },
    async handle(handlerInput) {
        let url = null
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
        console.log(handlerInput.requestEnvelope.context.AudioPlayer.playerActivity)
        // Start video if age is defined, else ask the age
        if(sessionAttributes.age) {
            // When videoCounter > videoListSize -> videoCounter reset
            if(sessionAttributes.videoCounter !== undefined && sessionAttributes.videoCounter < sessionAttributes.videoListSize-1)
                sessionAttributes.videoCounter++
            else
                sessionAttributes.videoCounter = 0
                
            // STATUS = play -> alexa is playing the trailer
            sessionAttributes.status = 'play'
                
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes)

            url = await getS3PreSignedUrl(`${sessionAttributes.videoCounter}.mp4`)
            
            // call mediaBuilder and return its value
            return mediaBuilder(handlerInput, url)
            
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
