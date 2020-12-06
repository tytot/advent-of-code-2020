const reader = require('../reader')

reader.getInput('inputs/input6.txt').then((input) => {
    const answers = input.join('\n').split('\n\n')
    console.log(`Solution found: ${answers.map((answer) => new Set(answer.replace(/[\n]/g, '')).size).reduce((acc, curr) => acc + curr)}`)

    let count = 0
    for (const answer of answers) {
        const set = new Set(answer.replace(/[\n]/g, ''))
        for (const letter of set) {
            const letterCount = answer.match(new RegExp(letter, 'g')).length
            const newLines = answer.match(new RegExp('\n', 'g'))
            const peopleCount = newLines ? newLines.length + 1 : 1
            if (letterCount === peopleCount) {
                count++
            }
        }
    }
    console.log(`Solution found: ${count}`)
})
