const Alexa = require('ask-sdk-core')
const { YesIntentHandler } = require('./handler/intent/YesIntentHandler')
const { AgeIntentHandler } = require('./handler/intent/AgeIntentHandler')
const { PlayVideoIntentHandler } = require('./handler/intent/PlayVideoIntentHandler')
const { PauseVideoIntentHandler } = require('./handler/intent/PauseVideoIntentHandler')
const { RestartVideoIntentHandler } = require('./handler/intent/RestartVideoIntentHandler')
const { PreviousVideoIntentHandler } = require('./handler/intent/PreviousVideoIntentHandler')
const { FallbackIntentHandler } = require('./handler/intent/FallbackIntentHandler')
const { VideoEndEventHandler } = require('./handler/event/VideoEndEventHandler')
const { config } = require('./common/config')
const { supportsDisplay } = require('./common/supportsDisplay')
const { launchDisplay } = require('./view/launchDisplay')

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    async handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
        
        // Set videoListSize
        sessionAttributes.videoListSize = config.LIST_SIZE
        
        // Set status to start
        sessionAttributes.status = 'start'
        
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
        const speakOutput = 'Olá, bem vindo ao Trailer de Filmes, gostaria de assistir à um trailer?';
        
        if(supportsDisplay(handlerInput)) {
            const display = await launchDisplay()
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt('Gostaria de assistir à um trailer?')
                .addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    version: '1.1',
                    document: display
                })
                .getResponse();
        }else {
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }
    }
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Diga sim para assistir um trailer, você pode pausar e resumir, pedir o próximo ou o trailer anterior. Ao final do trailer pode repetí-lo';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' 
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' 
            || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    }
,
    handle(handlerInput) {
        const speakOutput = 'Até mais!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(true)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        return handlerInput
            .responseBuilder
            .withShouldEndSession(true)
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Ocorreu um erro com a skill`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        AgeIntentHandler,
        YesIntentHandler,
        PlayVideoIntentHandler,
        PauseVideoIntentHandler,
        RestartVideoIntentHandler,
        PreviousVideoIntentHandler,
        VideoEndEventHandler,
        HelpIntentHandler,
        FallbackIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
