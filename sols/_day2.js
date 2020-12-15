const reader = require('../reader')

reader.getInput('inputs/input2.txt').then((input) => {
    // Part 1
    let numValid = 0
    for (const line of input) {
        const split = line.split(' ')
        const constraints = split[0].split('-')
        const count = (
            split[2].match(new RegExp(split[1].charAt(0), 'g')) || []
        ).length
        if (
            count >= parseInt(constraints[0]) &&
            count <= parseInt(constraints[1])
        )
            numValid++
    }
    console.log(`Solution found: ${numValid}`)

    // Part 2
    numValid = 0
    for (const line of input) {
        const split = line.split(' ')
        const locs = split[0].split('-')
        const letter = split[1].charAt(0)
        const password = split[2]
        if (
            (password.charAt(parseInt(locs[0]) - 1) === letter) !==
            (password.charAt(parseInt(locs[1]) - 1) === letter)
        )
            numValid++
    }
    console.log(`Solution found: ${numValid}`)
})
