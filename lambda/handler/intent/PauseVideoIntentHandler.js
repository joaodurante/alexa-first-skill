const Alexa = require('ask-sdk-core')
const { supportsDisplay } = require('../../common/supportsDisplay')

module.exports.PauseVideoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PauseVideoIntent'
    },
    async handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
        console.log('LOGLOGLOG' + handlerInput.requestEnvelope.context.AudioPlayer.playerActivity)
        
        if(sessionAttributes.status === 'play') {
            if (supportsDisplay(handlerInput)) {
                
                // STATUS = pause -> alexa paused a trailer
                sessionAttributes.status = 'pause'
                handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
                return handlerInput
                    .responseBuilder
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
                    .speak('Pausando')
                    .getResponse();
            } else {
                console.log(handlerInput.requestEnvelope.context.AudioPlayer.playerActivity)
            }
        } else {
        return handlerInput
            .responseBuilder
            .speak('Você não pode fazer isso agora')
            .getResponse()
        }
    }
}
