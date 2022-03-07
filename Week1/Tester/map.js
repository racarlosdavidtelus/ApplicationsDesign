function _map(array,cb){
    let newArray = [];
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        newArray.push(cb(element))
    }
    return newArray;
}
//console.log(_map([4,5,6],(x,y,z)=>x+x))
export default _map;
