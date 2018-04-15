require.config({

    paths: {
        "storage": "js/StringifyStorage",
        "messager": "js/Messager",
        "handler": "js/CommandHandler",
        "dispatcher": "js/Dispatcher",
        "actions": "js/Actions"
    }

});


require(['actions'], function (actions) {

    actions.load('nihao', function (ret) {
        document.getElementById("key").value = 'nihao'
        document.getElementById("value").value = typeof ret==='object'?JSON.stringify(ret):ret
    })
    window.actions=actions
});