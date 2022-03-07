/* The first is to assign an object to module.exports, 
 which is an object provided out of the box by the module system, 
 and this will make your file export just that object: */

/*
const car = {
    brand: 'Ford',
    model: 'Fiesta'
}
  
module.exports = car
*/

/* The second way is to add the exported object as a property of exports. 
This way allows you to export multiple objects, functions or data:*/
/*
const car = {
  brand: 'Ford',
  model: 'Fiesta'
}

exports.car = car
*/

/* or directly */

exports.car = {
    brand: 'Ford',
    model: 'Fiesta'
}
  