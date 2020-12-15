const reader = require('../reader')

reader.getInput('inputs/input9.txt').then((input) => {
    input = input.map((line) => parseInt(line))
    outer: for (let i = 25; i < input.length; i++) {
        for (let j = i - 25; j < i; j++) {
            for (let k = j + 1; k < i; k++)
                if (input[j] + input[k] === input[i]) continue outer
        }
        var goal = input[i]
        console.log(`Solution found: ${goal}`)
        break outer
    }
    for (let i = 0; i < input.length; i++) {
        for (let j = i + 2; j < input.length; j++) {
            const subset = input.slice(i, j)
            if (subset.reduce((a, b) => a + b) === goal)
                console.log(`Solution found: ${Math.min.apply(null, subset) + Math.max.apply(null, subset)}`)
        }
    }
})
