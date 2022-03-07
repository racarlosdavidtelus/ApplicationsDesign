function myFunction() {
    console.log("Hello, World!")
}

function once(cb) {
    let status = 0;
    return function (){
        if (status == 0 ) 
            cb()
        else
            console.log("Error la funcion ya fue ejecutada")
        status++;
    }    
}

const myFunctionOnce = once(myFunction);
myFunctionOnce()
// no me tiene que dejar
myFunctionOnce()