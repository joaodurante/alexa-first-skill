module.exports.videoTemplate = (url, time) => {
    var template = {
        "type": "APL",
        "version": "1.1",
        "settings": {},
        "theme": "dark",
        "import": [],
        "resources": [],
        "styles": {},
        "onMount": [],
        "graphics": {},
        "commands": {},
        "layouts": {},
        "mainTemplate": {
            "parameters": [
                "payload"
            ],
            "items": [{
                "type": "Container",
                "items": [{
                    "type": "Video",
                    "width": "100%",
                    "height": "100%",
                    "autoplay": true,
                    "source": [{
                        "offset": time,
                        "url": url
                    }],
                    "id": "video"
                }]
            }]
        }
    }
    return template
}
