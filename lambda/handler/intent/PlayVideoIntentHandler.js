const Alexa = require('ask-sdk-core')
const { supportsDisplay } = require('../../common/supportsDisplay')

module.exports.PlayVideoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PlayVideoIntent'
    },
    async handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
        console.log('LOGLOGLOG' + handlerInput.requestEnvelope.context.AudioPlayer.playerActivity)
        if(sessionAttributes.status === 'pause'){
            if (supportsDisplay(handlerInput)) {
                    // STATUS = play -> alexa is playing the trailer
                    sessionAttributes.status = 'play'
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
                                command: "play"
                            }]
                        })
                        .speak('Resumindo')
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
