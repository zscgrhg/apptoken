function currying() {
    var args = Array.prototype.slice.call(arguments);
    var func = args.shift();
    console.log('curr')
   return function () {
       var argsAppend = Array.prototype.slice.call(arguments);

       return func.apply(null, args.concat(argsAppend));
   }
}

function func3(a, b, c) {
    console.log(this)
    console.log(a+'>'+b+'>'+c)
}

currying(func3.bind({}),1,2)(4)

