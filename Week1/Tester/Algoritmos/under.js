var _ = require('./node_modules/underscore/underscore-min.js');

function myfunction(element){
    const params_size = element.length;
    //console.log(params_size)
    if (params_size == 5) {
        console.log(element,index,list,other,news) 
    }
}

//[1,2,3,6] <- element
//[one,two,three,six] <- index
_.each({one: 1, two: 2, three: 3, six:6}, myfunction);
_.each([1, 2, 3, 4], myfunction);

var sum = _.reduce({one: 1, two: 2, three: 3, six:6}, function(memo, num){ return memo + num; }, 4);
console.log(sum)