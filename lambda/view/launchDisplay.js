module.exports.launchDisplay = () => {
    return {
        "type": "APL",
        "version": "1.1",
        "settings": {},
        "theme": "dark",
        "mainTemplate": {
            "parameters": [
                "payload"
            ],
            "items": [
                {
                    "type": "Container",
                    "width": "100%",
                    "height": "100%",
                    "paddingLeft": "20",
                    "paddingBottom": "10",
                    "alignItems": "stretch",
                    "justifyContent": "start",
                    "shadowColor": "000",
                    "items": [
                        {
                            "type": "Image",
                            "scale": "best-fill",
                            "width": "100vw",
                            "height": "100vh",
                            "position": "absolute",
                            "source": "https://thumbs.gfycat.com/WeirdConcernedHorse-size_restricted.gif"
                        },
                        {
                            "type": "Container",
                            "grow": 1,
                            "justifyContent": "${viewport.shape == 'round' ? 'center' : 'end'}",
                            "item": {
                                "type": "Text",
                                "textAlignVertical": "bottom",
                                "color": "#FFF",
                                "fontStyle": "italic",
                                "fontSize": "40dp",
                                "text": "Bem vindo, gostaria de assistir à um trailer?",
                                "fontWeight": "bold"
                            }
                        }
                    ]
                }
            ]
        }
}
}