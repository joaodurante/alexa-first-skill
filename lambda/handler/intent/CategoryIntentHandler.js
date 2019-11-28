const Alexa = require('ask-sdk-core')
const { config } = require('../../common/config')
const { getTrailersNumber } = require('../../util')

module.exports.CategoryIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CategoryIntent'
    },
    async handle(handlerInput) {
        const category = handlerInput.requestEnvelope.request.intent.slots.category.value
        let categoryFolder = ''

        for (let cat of config.CATEGORIES) {
            if (cat.name === category)
                categoryFolder = cat.folder
        }

        if (categoryFolder) {
            const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
            sessionAttributes.categoryFolder = categoryFolder
            sessionAttributes.videoListSize = await getTrailersNumber(categoryFolder)
            sessionAttributes.videoCounter = undefined
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes)

            const speakOutput = `Ótimo, deseja começar o trailer?`

            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse()
        } else {
            const speakOutput = `A categoria ${category} não está disponível. Aqui vai as categorias disponíveis: aventura, drama e terror`

            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt('Qual categoria você deseja?')
                .getResponse()
        }

    }
};


