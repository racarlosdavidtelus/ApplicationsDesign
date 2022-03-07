const xx = 'x'
const yy = 'y'
console.log(xx, yy)

console.log('My %s has %d ears', 'cat', 2)
//%s format a variable as a string
//%d format a variable as a number
//%i format a variable as its integer part only
//%o format a variable as an object

const x = 1
const y = 2
const z = 3
console.count(
  'The value of x is ' + x + 
  ' and has been checked .. how many times?'
)
console.count(
  'The value of x is ' + x + 
  ' and has been checked .. how many times?'
)
console.count(
  'The value of y is ' + y + 
  ' and has been checked .. how many times?'
)

const oranges = ['orange', 'orange']
const apples = ['just one apple']
oranges.forEach(fruit => {
  console.count(fruit)
})
apples.forEach(fruit => {
  console.count(fruit)
})

console.countReset('orange')

oranges.forEach(fruit => {
  console.count(fruit)
})

const function2 = () => console.trace()
const function1 = () => function2()
function1()


// Calculate the time spent
// You can easily calculate how much time a function takes to run, using time() and timeEnd()
const doSomething = () => console.log('test')
const measureDoingSomething = () => {
  console.time('doSomething()')
  //do something, and measure the time it takes
  doSomething()
  console.timeEnd('doSomething()')
}
measureDoingSomething()

//Color the output

console.log('\x1b[33m%s\x1b[0m', 'hi!')

//const chalk = require('chalk')
//console.log(chalk.yellow('hi!'))

const ProgressBar = require('progress')

const bar = new ProgressBar(':bar', { total: 10 })
const timer = setInterval(() => {
  bar.tick()
  if (bar.complete) {
    clearInterval(timer)
  }
}, 100)
