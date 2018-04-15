define(function () {
    var RCT_WvBrige = window['__REACT_WEB_VIEW_BRIDGE'];
    var isRCT_WebView = !!RCT_WvBrige;
    var TYPE_REQUEST = 'command';
    var TYPE_RESPONSE = 'response';

    function send(payload) {
        if (isRCT_WebView) {
            var isReactNativePostMessageReady = !!window.originalPostMessage;
            if (isReactNativePostMessageReady) {
                postMessage(JSON.stringify(payload))
            } else {
                RCT_WvBrige.postMessage(JSON.stringify(payload))
            }
        } else {
            postMessage(JSON.stringify(payload), window.origin)
        }
    }

    var messager = {
        RCT_WvBrige: RCT_WvBrige,
        isRCT_WebView: isRCT_WebView,
        TYPE_REQUEST: TYPE_REQUEST,
        TYPE_RESPONSE: TYPE_RESPONSE,

        send: send,

        sendError: function (id, err) {
            send({
                id: id,
                type: TYPE_RESPONSE,
                error: err
            })
        },

        sendReponse: function (id, data) {
            send({
                id: id,
                type: TYPE_RESPONSE,
                data: data
            })
        }
    };

    return messager;
});