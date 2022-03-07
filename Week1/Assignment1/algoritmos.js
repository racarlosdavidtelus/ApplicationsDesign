const myArray = [1,2,3,4,5,6,6,7,9]
const myObjetc = {one: 1, two: 2, three: 3};

function each(data,cb) {
    let arrayFinal = []
    let indexObjectFinal = []
    const cb_params_size = cb.length;
    if (data instanceof Array) {
        //console.log('es array')
        arrayFinal = data
        //console.log(' -> ',arrayFinal)
    }else if (data instanceof Object){
        //console.log('es object')
        arrayFinal = Object.values(data);
        indexObjectFinal = Object.keys(data);
        //console.log(indexObjectFinal,' -> ',arrayFinal)
    }
    
    for (let pos = 0; pos < arrayFinal.length; pos++) {
        const element = arrayFinal[pos];
        const index = pos;
        const list = data
        if (cb_params_size == 1) {
            cb(element)
        }else if (cb_params_size == 2) {
            if (data instanceof Array) {
                cb(element,index)
            }else if (data instanceof Object){
                cb(element,indexObjectFinal[index])
            }
        }else if (cb_params_size == 3) {
            if (data instanceof Array) {
                cb(element,index,data)
            }else if (data instanceof Object){
                cb(element,indexObjectFinal[index],data)
            }
        }else{
            throw 'error'
        }
    }

}
// --------- tester each ---------
//each(myObjetc,(element,index,x)=>{console.log(element,index,x)})
//each(myArray,(element,index,x)=>{console.log(element,index,x)})

function map(data,cb) {
    let arrayFinal = []
    let indexObjectFinal = []
    const result = []
    const cb_params_size = cb.length;
    if (data instanceof Array) {
        arrayFinal = data
    }else if (data instanceof Object){
        arrayFinal = Object.values(data);
        indexObjectFinal = Object.keys(data);
    }
    for (let pos = 0; pos < arrayFinal.length; pos++) {
        const element = arrayFinal[pos];
        const index = pos;
        const list = data
        if (cb_params_size == 1) {
            result.push(cb(element))
        }else if (cb_params_size == 2) {
            if (data instanceof Array) {
                result.push(cb(element,index))
            }else if (data instanceof Object){
                result.push(cb(element,indexObjectFinal[index]))
            }
        }else if (cb_params_size == 3) {
            if (data instanceof Array) {
                result.push(cb(element,index,data))
            }else if (data instanceof Object){
                result.push(cb(element,indexObjectFinal[index],data))
            }
        }else{
            throw 'error'
        }
    }
    return result;
}
// --------- tester map ---------
//const res = map(myObjetc,(element,index,x)=>{return {element,index,x}})
//const res2 = map(myArray,(element,index,x)=>{return {element,index,x}})
//console.log(res)
//console.log(res2)


function map_each(data,cb) {
    const result = []
    each(data, function (element_,index_,array_){
        result.push(cb(element_,index_,array_))
    })
    return result;
}
// --------- tester map_each ---------
//console.log(map(myObjetc,(element)=>{return element+3;}))
//console.log(map(myArray,(element,index)=>{return index*5;}))

function filter(data,cb) {
    let arrayFinal = []
    let indexObjectFinal = []
    const result = []
    const cb_params_size = cb.length;
    if (data instanceof Array) {
        arrayFinal = data
    }else if (data instanceof Object){
        arrayFinal = Object.values(data);
        indexObjectFinal = Object.keys(data);
    }
    
    for (let pos = 0; pos < arrayFinal.length; pos++) {
        const element = arrayFinal[pos];
        const index = pos;
        const list = data
        if (cb_params_size == 1) {
            if (cb(element)) {
                result.push(element)
            }
        }else if (cb_params_size == 2) {
            if (data instanceof Array) {
                if (cb(element,index)) {
                    result.push(element)
                }
            }else if (data instanceof Object){
                if (cb(element,indexObjectFinal[index])) {
                    result.push(element)
                }
            }
        }else if (cb_params_size == 3) {
            if (data instanceof Array) {
                if (cb(element,index,data)) {
                    result.push(element)
                }
            }else if (data instanceof Object){
                if (cb(element,indexObjectFinal[index],data)) {
                    result.push(element)
                }
            }
        }else{
            throw 'error'
        }
    }
    return result;
}
// --------- tester filter ---------
//console.log(filter(myObjetc,(element)=>{return element<3;}))
//console.log(filter(myArray,(element,index)=>{return element<5;}))

function filter_each(data,cb) {
    const result = []
    each(data, function (element_,index_,array_){
        if (cb(element_,index_,array_)) {
            result.push(element_)
        }
    })
    return result;
}
// --------- tester filter_each ---------
//console.log(filter_each(myObjetc,(element)=>{return element<3;}))
//console.log(filter_each(myArray,(element,index)=>{return element<5;}))

function from (data,cb){
    //let args_size = from.length;
    let cb_isFunction = cb instanceof Function;
    //console.log(params_size)
    let arrayFinal = []
    const result = []
    let temp = 0;
    const cb_params_size = cb_isFunction == true ? cb.length : 0;
    console.log(cb_params_size)
    if (data instanceof Array) {
        //console.log('es array')
        arrayFinal = data
        //console.log(' -> ',arrayFinal)
    }else if (typeof data == "string"){
        //console.log('es string')
        temp = "";
        arrayFinal = data.split('');
        //console.log(indexObjectFinal,' -> ',arrayFinal)
    }else if (data instanceof Object){
        //console.log('es object')
        arrayFinal = Object.values(data);
        //console.log(indexObjectFinal,' -> ',arrayFinal)
    }
    
    for (let pos = 0; pos < arrayFinal.length; pos++) {
        const element = arrayFinal[pos];
        if (cb_isFunction == false) {
            result.push(element)
        } else if (cb_isFunction == true) {
            if (cb_params_size == 1) {
                result.push(cb(element))
            }else if (cb_params_size == 2) {
                result.push(cb(temp, element));
                temp = element;
            }else{
                throw 'error1'
            }
        } else {
            throw 'error2'
        }

        
    }
    return result;
}
// --------- tester from ---------
//console.log(Array.from('foo'));
//console.log(Array.from([1,2,3,4,5,6], (a,b) => a+b));
//console.log(from([1,2,3,4,5,6], (a,b) => a+b));
//console.log(from('carlosdavid', (a,b) => a+b));
//console.log(from('carlosdavid'));

function reduce (data,cb,initValue){
    //data.unshift(init);
    /*
    const cb_params_size = cb.length;
    let result = 0;
    if (cb_params_size == 2) {
        for (let index = 0; index < data.length; index++) {
            let memo = data[index];
            let num = data[index];

        } 
    }
    */
    let result = initValue;
    const cb_params_size = cb.length;
    if (data instanceof Array) {
        arrayFinal = data
    }else if (data instanceof Object){
        arrayFinal = Object.values(data);
    }
    for (let pos = 0; pos < arrayFinal.length; pos++) {
        const element = arrayFinal[pos];
        if (cb_params_size == 2) {
            result = cb(result,element);
        }else{
            throw 'error'
        }
    }
    return result;
}
// --------- tester reduce ---------
//var sum = reduce([1, 2, 3], function(memo, num){ return memo + num; }, 4);
//var sum2 = reduce(myObjetc, function(memo, num){ return memo + num; }, 10);
//console.log(sum)
//console.log(sum2)

function curry(cb) {
    let mem = [];
    let status = 0;
    return function (){
        const _args = arguments;
        status++;
        mem.push(_args[0])
        if (status == cb.length){
            return cb(...mem)
        }
    }    
}
// --------- tester curry ---------
/*
function _myFunction(a,b,c) {
    return a+b+c;
}

const myFunctionOnce = curry(_myFunction);
myFunctionOnce(1)
myFunctionOnce(2)
console.log(myFunctionOnce(3))
*/

function compose (){
    const ar = arguments;
    const arg_size = arguments.length
    return function (){
        let ar2;
        for (let index = 0; index < arg_size; index++) {
            if (index == 0) {
                ar2 = ar[index].apply(this,arguments); 
            }else{
                ar2 = ar[index].call(this,ar2); 
            }
        }
    }
}
// ------- tester compose ----------
//function one(x){return x+x+x;}
//function two(y){console.log('x'+y+y)}

//const my = compose(one,two);
//my(6)