define(['storage','messager'],function (storage,messager){
    function currying() {
        var args = Array.prototype.slice.call(arguments);
        var func = args.shift();
        return function () {
            var argsAppend = Array.prototype.slice.call(arguments);
            return func.apply(null, args.concat(argsAppend));
        }
    }

    var handler={
        save: function (id, args) {
            storage.save(args.key, args.value,currying(messager.sendReponse,id),currying(messager.sendError,id))

        },
        load: function (id, key) {
            storage.load(key,currying(messager.sendReponse,id),currying(messager.sendError,id))
        },
        remove: function (id, key) {
            storage.remove(key,currying(messager.sendReponse,id),currying(messager.sendError,id))
        },
        getAllKeys: function (id) {
            storage.getAllKeys(currying(messager.sendReponse,id),currying(messager.sendError,id))
        },
        multiGet: function (id, args) {
            storage.multiGet(args,currying(messager.sendReponse,id),currying(messager.sendError,id))
        }
    }

    return handler;

});