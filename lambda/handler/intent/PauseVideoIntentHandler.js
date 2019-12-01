const Alexa = require('ask-sdk-core')
const { supportsDisplay } = require('../../common/supportsDisplay')

module.exports.PauseVideoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PauseVideoIntent'
    },
    async handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
        const speakOutput = 'Pausando'

        if (sessionAttributes.status === 'play') {
            if (supportsDisplay(handlerInput)) {
                console.log('SUPPORTS')
                // STATUS = pause -> alexa paused a trailer
                sessionAttributes.status = 'pause'
                handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
                return handlerInput
                    .responseBuilder
                    .speak(speakOutput)
                    .addDirective({
                        type: 'Alexa.Presentation.APL.ExecuteCommands',
                        version: '1.2',
                        token: 'VideoPlayerToken',
                        commands: [{
                            type: "ControlMedia",
                            componentId: "video",
                            command: "pause"
                        }]
                    })
                    .getResponse()

            } else {
                console.log('PAUSE INTENT')
                return handlerInput.responseBuilder
                        .addAudioPlayerStopDirective()
                        .withShouldEndSession(true)
                        .speak(speakOutput)
                        .getResponse()
            }

        } else {
            return handlerInput.responseBuilder
                .speak('Você não pode fazer isso agora')
                .getResponse()
        }
    }
}
