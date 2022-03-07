export const carlosdavid = {
    map: (array,cb) => {
        let newArray = [];
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            newArray.push(cb(element))
        }
        return newArray;
    },

    each: (array,cb) => {
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            cb(element)
        }
    },
    name: 'carlos david',
}

//console.log(_map([4,5,6],(x,y,z)=>x+x))
//export {_map,name};
