const reader = require('../reader')

reader.getInput('inputs/input10.txt').then((input) => {
    input.unshift(0)
    input = input.map((line) => parseInt(line)).sort((a, b) => a - b)

    const numDiff = (jolt) =>
        input
            .map((rating, i, ratings) => rating - (ratings[i - 1] || 0))
            .filter((diff) => diff == jolt).length
    console.log(`Solution found: ${numDiff(1) * (numDiff(3) + 1)}`)

    arrangements = input.map((rating, i) => (i == 0 ? 1 : 0))
    for (let i = 0; i < arrangements.length; i++) {
        for (let j = i - 3; j < i; j++) {
            if (j >= 0 && input[i] <= input[j] + 3)
                arrangements[i] += arrangements[j]
        }
    }
    console.log(`Solution found: ${arrangements[arrangements.length - 1]}`)
})
