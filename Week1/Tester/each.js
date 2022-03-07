function _each(array,cb){
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        cb(element)
    }
}

//console.log(_each([4,5,6],(x)=>console.log(x+x)))

const arr = [1,2,3,4,5];
const newA = [];
arr.forEach(element => {
    console.log(element)
    newA.push(element*2)
});
console.log(newA)
//_.map([1, 2, 3], function(num){ return num * 3; });

