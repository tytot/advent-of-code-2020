const reader = require('../reader')

reader.getInput('inputs/input1.txt').then((input) => {

    // Part 1 O(N)
    let mem = {}
    for (const val of input) {
        const other = 2020 - val
        if (mem[other]) {
            console.log(`Solution found: ${val} * ${other} = ${val * other}`)
            break
        }
        mem[val] = true
    }

    // Part 2 O(N^2)
    mem = {}
    for (const val1 of input) {
        mem[val1] = input.map((val2) => val1 + val2)
    }
    outer: for (const val of input) {
        const other = 2020 - val
        for (const key in mem) {
            const index = mem[key].indexOf(other)
            if (index !== -1) {
                const last = input[index]
                console.log(`Solution found: ${val} * ${key} * ${last} = ${val * key * last}`)
                break outer
            }
        }
    }
})
