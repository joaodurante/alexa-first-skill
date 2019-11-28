const Alexa = require('ask-sdk-core')
const { supportsDisplay } = require('../../common/supportsDisplay')

module.exports.PlayVideoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PlayVideoIntent'
    },
    async handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()

        if(sessionAttributes.status === 'pause'){
            if (supportsDisplay(handlerInput)) {
                    sessionAttributes.status = 'play'                                           // STATUS = play -> alexa is playing the trailer
                    handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
                    return handlerInput
                        .responseBuilder
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
                        .speak('Resumindo')
                        .getResponse();
                } else {
                    console.log('Nao suporta')
                }
        } else {
            return handlerInput
                .responseBuilder
                .speak('Você não pode fazer isso agora')
                .getResponse()
        }
    }
}
