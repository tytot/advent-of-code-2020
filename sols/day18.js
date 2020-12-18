const reader = require('../reader')

Number.prototype.add = function (n) { return this + n }
Number.prototype.multiply = function (n) { return this * n }
reader.getInput('inputs/input18.txt').then((input) => {
    console.log(`Solution found: ${input.reduce((acc, line) => acc + eval(line.replace(/[0-9]/g, '($&)').replace(/ \+ /g, '.add').replace(/ \* /g, '.multiply')), 0)}`)
    console.log(`Solution found: ${input.reduce((acc, line) => acc + eval(line.replace(/[0-9]/g, '($&)').replace(/ \+ /g, '.add')), 0)}`)
})