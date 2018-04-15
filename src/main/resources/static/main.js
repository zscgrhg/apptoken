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

    actions.multiSet([
        ["k1","v1"],
        ["k2","v2"],
        ["k3","v3"],
        ["k4","v4"],
        ["k5","v5"],
    ],function (ret) {
        alert(ret)
    })
});