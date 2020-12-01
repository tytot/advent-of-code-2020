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
        mem[val1] = {}
        for (const val2 of input) {
            if (val1 !== val2) 
                mem[val1][val1 + val2] = val2
        }
    }
    outer: for (const val of input) {
        const other = 2020 - val
        for (const key in mem) {
            if (mem[key][other]) {
                console.log(
                    `Solution found: ${val} * ${key} * ${mem[key][other]} = ${
                        val * key * mem[key][other]
                    }`
                )
                break outer
            }
        }
    }
})
