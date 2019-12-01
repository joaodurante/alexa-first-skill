const Alexa = require('ask-sdk-core')
const { supportsDisplay } = require('../../common/supportsDisplay')
const { mediaBuilder } = require('../../common/mediaBuilder')

module.exports.PlayVideoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PlayVideoIntent'
    },
    async handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
        const speakOutput = 'Continuando'

        if(sessionAttributes.status === 'pause'){
            if (supportsDisplay(handlerInput)) {
                    sessionAttributes.status = 'play'                                           // STATUS = play -> alexa is playing the trailer
                    handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
                    return handlerInput
                        .responseBuilder
                        .speak(speakOutput)
                        .addDirective({
                            type: 'Alexa.Presentation.APL.ExecuteCommands',
                            version: '1.1',
                            token: 'VideoPlayerToken',
                            commands: [{
                                type: "ControlMedia",
                                componentId: "video",
                                command: "play"
                            }]
                        })
                        .getResponse()
                        
                } else {
                    const offset = handlerInput.requestEnvelope.context.AudioPlayer.offsetInMilliseconds
                    console.log('Audio player - Token: ' + sessionAttributes.videoCounter + ' - Offset: ' + offset)
                    mediaBuilder(handlerInput, sessionAttributes.videoCounter, offset, speakOutput)
                }
                
        } else {
            return handlerInput
                .responseBuilder
                .speak('Você não pode fazer isso agora')
                .getResponse()
        }
    }
}
