define([ 'messager', 'dispatcher'], function ( messager, dispatcher) {
    function handlerMessage(event) {
        if (event.origin && event.origin !== window.origin) {
            return;
        }

        var payload = JSON.parse(event.data)
        if (payload.type === messager.TYPE_RESPONSE) {
            dispatcher.onResponse(payload)
        } else if ((!messager.isRCT_WebView) && payload.type === messager.TYPE_REQUEST) {
            dispatcher.doApply(dispatcher.commandHandler, payload.command, payload.id, payload.args)
        } else {
            console.error('unkown message:' + event.data)
        }
    }

    if (messager.isRCT_WebView) {
        document.addEventListener("message", handlerMessage, false);
    } else {
        window.addEventListener("message", handlerMessage, false);
    }

    function noop() {

    }

    return {
        save: function (k, v, onSuccess, onError) {
            dispatcher.sendCommand({command: 'save', args: {key: k, value: v}}, (onSuccess||noop), (onError||noop))
        },
        load: function (k, onSuccess, onError) {
            dispatcher.sendCommand({command: 'load', args: k}, (onSuccess||noop), (onError||noop))
        },
        remove: function (k, onSuccess, onError) {
            dispatcher.sendCommand({command: 'remove', args: k}, (onSuccess||noop), (onError||noop))
        },
        multiSet: function (keyValuePairs, onSuccess, onError) {
            dispatcher.sendCommand({command: 'multiSet', args: keyValuePairs}, (onSuccess||noop), (onError||noop))
        },
        multiGet: function (kArr, onSuccess, onError) {
            dispatcher.sendCommand({command: 'multiGet', args: kArr}, (onSuccess||noop), (onError||noop))
        },
        multiRemove: function (kArr, onSuccess, onError) {
            dispatcher.sendCommand({command: 'multiRemove', args: kArr}, (onSuccess||noop), (onError||noop))
        },
        getAllKeys: function (onSuccess, onError) {
            dispatcher.sendCommand({command: 'getAllKeys'}, (onSuccess||noop), (onError||noop))
        },
        clear: function (onSuccess, onError) {
            dispatcher.sendCommand({command: 'clear'}, (onSuccess||noop), (onError||noop))
        },
    }
});