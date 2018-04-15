define(['storage', 'messager', 'handler'], function (storage, messager, handler) {
    var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

    function genUUID() {
        var chars = CHARS, uuid = new Array(36), rnd = 0, r;
        for (var i = 0; i < 36; i++) {
            if (i == 8 || i == 13 || i == 18 || i == 23) {
                uuid[i] = '-';
            } else if (i == 14) {
                uuid[i] = '4';
            } else {
                if (rnd <= 0x02) rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
                r = rnd & 0xf;
                rnd = rnd >> 4;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
        return uuid.join('');
    };

    function doApply() {
        var args = Array.prototype.slice.call(arguments);
        var thisObj = args.shift();
        var funcName = args.shift();
        var func = thisObj[funcName];
        return func.apply(thisObj, args);
    }

    var dispatcher = {

        doApply:doApply,
        stubs: {},
        sendCommand: function (intent, onSuccess, onError) {
            var payload = Object.assign({}, intent)
            var id = genUUID();
            payload.id = id;
            payload.type = messager.TYPE_REQUEST
            this.stubs[id] = {
                stub: payload,
                onSuccess: onSuccess,
                onError: onError
            }
            messager.send(payload)
        },
        onResponse: function (response) {
            var stub = this.stubs[response.id];
            if (!stub) {
                console.warn('stub not found:' + JSON.stringify(response))
                return;
            }
            try {
                if (response.error) {
                    doApply(stub, 'onError', response.error)
                } else {
                    doApply(stub, 'onSuccess', response.data)
                }
            } finally {
                delete this.stubs[response.id];
                console.log(this.stubs)
            }
        },
        commandHandler:{}
    }
    if(!messager.isRCT_WebView){
        console.log('not react-native')
        dispatcher.commandHandler=handler;
    }
    return dispatcher;

});