define(function () {
    function noop() {
    }

    function encode(obj) {
        var wapper = {
            type: 'stringify_storage',
            value: obj
        }
        return JSON.stringify(wapper)
    }

    function decode(str) {
        if (typeof str === 'string') {
            try {
                var parse = JSON.parse(str);
                if (parse.type === 'stringify_storage') {
                    return parse.value
                }
            } catch (e) {

            }
        }
        return str
    }

    var storage = {
        save: function (key, value, onSuccess, onError) {
            var strValue = encode(value);
            localStorage.setItem(key, strValue);
            (onSuccess || noop)('ok')
        },

        load: function (key, onSuccess, onError) {
            var item = localStorage.getItem(key);
            if (onSuccess) {
                onSuccess(decode(item))
            }
        },

        remove: function (key, onSuccess, onError) {
            localStorage.removeItem(key);
            (onSuccess || noop)('ok');
        },

        getAllKeys: function (onSuccess, onError) {
            var ret = []
            for (var i = 0; i < localStorage.length; i++) {
                ret.push(localStorage.key(i))
            }
            (onSuccess || noop)(ret)
        },

        multiGet: function (keys, onSuccess, onError) {

            var ret = keys.map(function (key) {
                return [key, decode(localStorage[key])];
            })

            if (onSuccess) {
                onSuccess(ret)
            }
        }
    }
    return storage;
});