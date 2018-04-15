define(['storage', 'messager', 'handler', 'dispatcher'], function (storage, messager, handler, dispatcher) {
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
            console.error('not acceptable:' + event.data)
        }
    }

    if (messager.isRCT_WebView) {
        document.addEventListener("message", handlerMessage, false);
    } else {
        window.addEventListener("message", handlerMessage, false);
    }

    return {
        save: function (k, v, onSuccess, onError) {
            dispatcher.sendCommand({command: 'save', args: {key: k, value: JSON.stringify(v)}}, onSuccess, onError)
        },
        load: function (k, onSuccess, onError) {
            dispatcher.sendCommand({command: 'load', args: k}, onSuccess, onError)
        },
        remove: function (k, onSuccess, onError) {
            dispatcher.sendCommand({command: 'remove', args: k}, onSuccess, onError)
        },
        merge: function (k, v, onSuccess, onError) {
            dispatcher.sendCommand({command: 'merge', args: {key: k, value: v}}, onSuccess, onError)
        },
        getAllKeys: function (onSuccess, onError) {
            dispatcher.sendCommand({command: 'getAllKeys'}, onSuccess, onError)
        },
        multiGet: function (kArr, onSuccess, onError) {
            dispatcher.sendCommand({command: 'multiGet', args: kArr}, onSuccess, onError)
        }
    }
});